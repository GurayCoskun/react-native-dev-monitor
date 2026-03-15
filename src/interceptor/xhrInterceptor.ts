import type { NetworkLog } from '../../core';

const readBlobAsText = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(blob);
  });
};

export class XHRInterceptor {
  public static install(onLog: (log: NetworkLog) => void) {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

    // 1. Request Header'ları yakalamak için setRequestHeader'ı override ediyoruz
    XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
      if (this._log) {
        this._log.requestHeaders = {
          ...this._log.requestHeaders,
          [header]: value,
        };
      }
      onLog({ ...this._log });
      return originalSetRequestHeader.apply(this, arguments as any);
    };

    XMLHttpRequest.prototype.open = function (method, url) {
      this._log = {
        id: Math.random().toString(36).substring(7),
        url: url.toString(),
        method,
        startTime: Date.now(),
        type: 'xhr',
        requestHeaders: {},
        responseHeaders: {}, // Header'lar için yer açtık
      };

      // Eğer istek fetch polyfill'den geliyorsa tipini 'fetch' olarak işaretleyelim
      // React Native fetch polyfill'i genellikle _fetchOptions ekler
      if ((this as any)._fetchOptions) {
        this._log.type = 'fetch';
      }

      onLog({ ...this._log });
      return originalOpen.apply(this, arguments as any);
    };

    XMLHttpRequest.prototype.send = function (body) {
      this._log.requestBody = body;

      const emitFinalLog = async () => {
        this._log.endTime = Date.now();
        this._log.duration = this._log.endTime - this._log.startTime;
        this._log.status = this.status;

        // ... (Header yakalama kısımları aynı kalsın)

        let responseData: any = null;

        try {
          if (this.responseType === 'blob' && this.response) {
            // 1. EĞER BLOB İSE: FileReader ile oku
            try {
              const text = await readBlobAsText(this.response);
              try {
                responseData = JSON.parse(text);
              } catch {
                responseData = text;
              }
            } catch {
              responseData = '[Blob read error]';
            }
          } else if (!this.responseType || this.responseType === 'text') {
            responseData = this.responseText;
          } else {
            responseData = this.response;
          }

          // 2. JSON Parse İşlemi (Hala string ise)
          if (typeof responseData === 'string') {
            try {
              this._log.responseBody = JSON.parse(responseData);
            } catch {
              this._log.responseBody = responseData;
            }
          } else {
            this._log.responseBody = responseData;
          }
        } catch (e) {
          this._log.responseBody = '[Error reading response]';
        }

        onLog({ ...this._log });
      };

      // XHR event listener'larını ekle
      this.addEventListener('load', emitFinalLog);
      this.addEventListener('error', () => {
        this._log.status = 0;
        emitFinalLog();
      });

      return originalSend.apply(this, arguments as any);
    };
  }
}
