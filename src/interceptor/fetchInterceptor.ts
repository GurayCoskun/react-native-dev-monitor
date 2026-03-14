import type { NetworkLog } from '../core';

export class FetchInterceptor {
  public static install(onLog: (log: NetworkLog) => void) {
    const originalFetch = global.fetch;

    global.fetch = async (...args) => {
      const startTime = Date.now();
      const [resource, config] = args;
      const url =
        typeof resource === 'string' ? resource : (resource as Request).url;
      const method = config?.method || 'GET';

      const log: NetworkLog = {
        id: Math.random().toString(36).substring(7),
        url,
        method,
        requestHeaders: (config?.headers as Record<string, string>) || {},
        requestBody: config?.body,
        startTime,
        type: 'fetch',
      };

      onLog({ ...log });

      try {
        const response = await originalFetch(...args);
        const clone = response.clone();

        log.status = response.status;
        log.endTime = Date.now();
        log.duration = log.endTime - log.startTime;

        const text = await clone.text();
        try {
          log.responseBody = JSON.parse(text);
        } catch {
          log.responseBody = text;
        }

        onLog({ ...log });
        return response;
      } catch (error) {
        log.status = 0;
        log.endTime = Date.now();
        log.duration = log.endTime - log.startTime;
        onLog({ ...log });
        throw error;
      }
    };
  }
}
