import { type NetworkLog } from '../types';
import { shellEscape, stringifyValue } from './string';

const normalizeHeaders = (headers: unknown): Record<string, string> => {
  if (!headers || typeof headers !== 'object') return {};
  return Object.entries(headers as Record<string, unknown>).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (value === undefined || value === null) return acc;
    acc[key] = Array.isArray(value)
      ? value.map((item) => String(item)).join(', ')
      : String(value);
    return acc;
  }, {});
};

const buildCurlCommand = (log: NetworkLog) => {
  const method = String(log.method ?? 'GET').toUpperCase();
  const url = String(log.url ?? '');
  const headers = normalizeHeaders(log.requestHeaders);
  const requestData = stringifyValue(log.requestBody);

  const parts = ['curl', '-X', method, shellEscape(url)];
  Object.entries(headers).forEach(([key, value]) => {
    parts.push('-H', shellEscape(`${key}: ${value}`));
  });
  if (requestData) {
    parts.push('--data-raw', shellEscape(requestData));
  }

  return parts.join(' ');
};

export { buildCurlCommand };
