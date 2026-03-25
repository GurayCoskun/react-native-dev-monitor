import type { NetworkLog } from '../core';

const readBlobAsText = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(blob);
  });
};

const parseResponseHeaders = (raw: unknown): Record<string, string> => {
  if (typeof raw !== 'string' || !raw.trim()) return {};
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, line) => {
      const index = line.indexOf(':');
      if (index === -1) return acc;
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      if (!key) return acc;
      acc[key] = value;
      return acc;
    }, {});
};

const PATCHED = Symbol.for('react-native-dev-monitor:xhr-patched');

export class XHRInterceptor {
  public static install(onLog: (log: NetworkLog) => void) {
    const installInto = (XHR: typeof XMLHttpRequest | undefined) => {
      if (!XHR?.prototype) return;
      if ((XHR.prototype as any)[PATCHED]) return;
      (XHR.prototype as any)[PATCHED] = true;

      const originalOpen = XHR.prototype.open;
      const originalSend = XHR.prototype.send;
      const originalSetRequestHeader = XHR.prototype.setRequestHeader;

      XHR.prototype.setRequestHeader = function (header, value) {
        if (this._log) {
          this._log.requestHeaders = {
            ...this._log.requestHeaders,
            [String(header)]: String(value),
          };
          onLog({ ...this._log });
        }
        return originalSetRequestHeader.apply(this, arguments as any);
      };

      XHR.prototype.open = function (method, url) {
        this._log = {
          id: Math.random().toString(36).substring(7),
          url: String(url),
          method: String(method),
          startTime: Date.now(),
          type: 'xhr',
          requestHeaders: {},
          responseHeaders: {},
        };

        // If the request originates from RN's fetch polyfill, mark it as fetch.
        if ((this as any)._fetchOptions) {
          this._log.type = 'fetch';
        }

        onLog({ ...this._log });
        return originalOpen.apply(this, arguments as any);
      };

      XHR.prototype.send = function (body) {
        if (!this._log) {
          return originalSend.apply(this, arguments as any);
        }

        this._log.requestBody = body;

        const emitFinalLog = async () => {
          if (!this._log) return;

          this._log.endTime = Date.now();
          this._log.duration = this._log.endTime - this._log.startTime;
          this._log.status = this.status;

          try {
            if (typeof this.getAllResponseHeaders === 'function') {
              this._log.responseHeaders = parseResponseHeaders(
                this.getAllResponseHeaders()
              );
            }
          } catch {
            // ignore
          }

          let responseData: any = null;

          try {
            if (this.responseType === 'blob' && this.response) {
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

            if (typeof responseData === 'string') {
              try {
                this._log.responseBody = JSON.parse(responseData);
              } catch {
                this._log.responseBody = responseData;
              }
            } else {
              this._log.responseBody = responseData;
            }
          } catch {
            this._log.responseBody = '[Error reading response]';
          }

          onLog({ ...this._log });
        };

        this.addEventListener('load', emitFinalLog);
        this.addEventListener('error', () => {
          if (this._log) this._log.status = 0;
          emitFinalLog();
        });

        return originalSend.apply(this, arguments as any);
      };
    };

    const globalAny = globalThis as any;
    installInto(globalAny.XMLHttpRequest);
    installInto(globalAny.originalXMLHttpRequest);
  }
}
