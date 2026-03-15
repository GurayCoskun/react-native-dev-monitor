const getQueryParams = (rawUrl: string) => {
  if (!rawUrl) return {};

  try {
    const parsed = new URL(rawUrl, 'http://localhost');
    const entries = Array.from(parsed.searchParams.entries());
    return entries.reduce<Record<string, string | string[]>>(
      (acc, [key, value]) => {
        const existing = acc[key];
        if (existing === undefined) {
          acc[key] = value;
          return acc;
        }
        if (Array.isArray(existing)) {
          acc[key] = [...existing, value];
          return acc;
        }
        acc[key] = [existing, value];
        return acc;
      },
      {}
    );
  } catch {
    return {};
  }
};

const shellEscape = (value: string) => `'${value.replace(/'/g, `'\\''`)}'`;

const stringifyValue = (value: unknown) => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

export { getQueryParams, stringifyValue, shellEscape };
