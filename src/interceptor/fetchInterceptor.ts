import type { NetworkLog } from '../core';

const normalizeHeaders = (headers: unknown): Record<string, string> => {
  if (!headers) return {};

  if (typeof (headers as any).forEach === 'function') {
    const result: Record<string, string> = {};
    (headers as any).forEach((value: unknown, key: unknown) => {
      if (key === undefined || key === null) return;
      if (value === undefined || value === null) return;
      result[String(key)] = String(value);
    });
    return result;
  }

  if (Array.isArray(headers)) {
    return headers.reduce<Record<string, string>>((acc, item) => {
      if (!Array.isArray(item) || item.length < 2) return acc;
      const [key, value] = item;
      if (key === undefined || key === null) return acc;
      if (value === undefined || value === null) return acc;
      acc[String(key)] = String(value);
      return acc;
    }, {});
  }

  if (typeof headers === 'object') {
    return Object.entries(headers as Record<string, unknown>).reduce<
      Record<string, string>
    >((acc, [key, value]) => {
      if (value === undefined || value === null) return acc;
      acc[key] = Array.isArray(value)
        ? value.map((part) => String(part)).join(', ')
        : String(value);
      return acc;
    }, {});
  }

  return {};
};

const safeJsonParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const safeReadResponseBody = async (response: any) => {
  try {
    const cloned = response.clone();
    const text = await cloned.text();
    return safeJsonParse(text);
  } catch {
    return '[Error reading response]';
  }
};

const getUrlAndMethod = (input: any, init?: any) => {
  const initHeaders = normalizeHeaders(init?.headers);

  if (typeof input === 'string') {
    return {
      url: input,
      method: String(init?.method ?? 'GET').toUpperCase(),
      requestHeaders: initHeaders,
      body: init?.body,
    };
  }

  const requestLike = input as any;
  const url = String(requestLike?.url ?? '');
  const method = String(init?.method ?? requestLike?.method ?? 'GET').toUpperCase();
  const requestHeaders = {
    ...normalizeHeaders(requestLike?.headers),
    ...initHeaders,
  };

  return { url, method, requestHeaders, body: init?.body };
};

export class FetchInterceptor {
  public static install(onLog: (log: NetworkLog) => void) {
    const globalAny = globalThis as any;
    if (globalAny.__devMonitorFetchInstalled) return;
    globalAny.__devMonitorFetchInstalled = true;

    const originalFetch = globalAny.fetch;
    if (typeof originalFetch !== 'function') return;

    globalAny.fetch = async (input: any, init?: any) => {
      const { url, method, requestHeaders, body } = getUrlAndMethod(input, init);

      const log: NetworkLog = {
        id: Math.random().toString(36).substring(7),
        url,
        method,
        startTime: Date.now(),
        type: 'fetch',
        requestHeaders,
        requestBody: body,
        responseHeaders: {},
      };

      onLog({ ...log });

      try {
        const response = await originalFetch(input, init);

        const responseHeaders = normalizeHeaders((response as any).headers);
        const responseBody = await safeReadResponseBody(response);

        const endTime = Date.now();
        onLog({
          ...log,
          status: (response as any).status,
          endTime,
          duration: endTime - log.startTime,
          responseHeaders,
          responseBody,
        });

        return response;
      } catch (error: any) {
        const endTime = Date.now();
        onLog({
          ...log,
          status: 0,
          endTime,
          duration: endTime - log.startTime,
          responseBody: String(error?.message ?? error ?? 'Unknown error'),
        });
        throw error;
      }
    };
  }
}
