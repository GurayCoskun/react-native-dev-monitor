'use client';

import { useMemo, useState } from 'react';
import { Snackbar, TextField } from '@mui/material';

type ReadOnlyJsonEditorProps = {
  value: unknown;
};

const isObjectLike = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const nodePreview = (value: unknown) => {
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (isObjectLike(value)) return `Object(${Object.keys(value).length})`;
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
};

const filterByQuery = (
  value: unknown,
  query: string,
  key?: string
): unknown | undefined => {
  if (!query) return value;
  const keyMatches = key?.toLowerCase().includes(query) ?? false;

  if (!isObjectLike(value)) {
    const valueMatches = nodePreview(value).toLowerCase().includes(query);
    return keyMatches || valueMatches ? value : undefined;
  }

  if (keyMatches) return value;

  if (Array.isArray(value)) {
    const filtered = value
      .map((child, index) => filterByQuery(child, query, String(index)))
      .filter((item) => item !== undefined);
    return filtered.length ? filtered : undefined;
  }

  const filteredObject = Object.entries(value).reduce<Record<string, unknown>>(
    (acc, [childKey, childValue]) => {
      const filteredChild = filterByQuery(childValue, query, childKey);
      if (filteredChild !== undefined) {
        acc[childKey] = filteredChild;
      }
      return acc;
    },
    {}
  );

  return Object.keys(filteredObject).length ? filteredObject : undefined;
};

type JsonNodeProps = {
  name?: string;
  value: unknown;
  level?: number;
  onClick?: (text: string) => void;
  forceOpen?: boolean;
};

const JsonNode = ({
  name,
  value,
  level = 0,
  onClick,
  forceOpen = false,
}: JsonNodeProps) => {
  const [open, setOpen] = useState(level < 1);
  const isOpen = forceOpen || open;
  const indent = {
    paddingLeft: `${level * 4}px`,
    cursor: 'pointer',
  };

  if (!isObjectLike(value)) {
    return (
      <div style={indent} className="font-mono text-xs leading-6 break-all">
        {name ? (
          <span
            className="text-blue-300"
            onClick={() => onClick?.(nodePreview(value))}
          >
            {name}:{' '}
          </span>
        ) : null}
        <span
          className="text-slate-200"
          onClick={() => onClick?.(nodePreview(value))}
        >
          {nodePreview(value)}
        </span>
      </div>
    );
  }

  const entries = Array.isArray(value)
    ? value.map((item, index) => [String(index), item] as const)
    : Object.entries(value);

  return (
    <div style={indent} className="font-mono text-xs leading-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-slate-100"
      >
        {isOpen ? '▼' : '▶'}{' '}
        {name ? <span className="text-blue-300">{name}: </span> : null}
        <span className="text-slate-400">{nodePreview(value)}</span>
      </button>
      {isOpen && (
        <div>
          {entries.length === 0 ? (
            <div style={{ paddingLeft: '12px' }} className="text-slate-500">
              empty
            </div>
          ) : (
            entries.map(([key, child]) => (
              <JsonNode
                key={key}
                name={key}
                value={child}
                level={level + 1}
                onClick={onClick}
                forceOpen={forceOpen}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export const JsonEditor = ({ value }: ReadOnlyJsonEditorProps) => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const text = useMemo(() => {
    if (value === undefined) return '-';
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }, [value]);

  const copy = async (text: string) => {
    await (navigator as any).clipboard.writeText(text);
    setCopied(true);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredValue = useMemo(
    () => filterByQuery(value, normalizedQuery),
    [value, normalizedQuery]
  );

  return (
    <div className="rounded-md border border-slate-700 bg-[#111827]">
      <div className="flex items-center justify-between gap-2 p-2 border-b border-slate-700">
        <TextField
          size="small"
          value={searchQuery}
          onChange={(event: any) => setSearchQuery(event.target.value)}
          placeholder="Search nested values..."
          sx={{
            'minWidth': 180,
            '& .MuiInputBase-root': { color: '#e2e8f0', fontSize: 12 },
          }}
        />
        <button
          type="button"
          className="text-xs text-slate-200 underline"
          onClick={() => copy(text)}
        >
          Copy
        </button>
      </div>
      <div className="p-2 max-h-[320px] overflow-auto">
        {value === undefined ? (
          <div className="font-mono text-xs text-slate-400">-</div>
        ) : filteredValue === undefined ? (
          <div className="font-mono text-xs text-slate-400">
            No matches found.
          </div>
        ) : (
          <JsonNode
            value={filteredValue}
            onClick={copy}
            forceOpen={Boolean(normalizedQuery)}
          />
        )}
      </div>
      <Snackbar
        open={copied}
        autoHideDuration={1800}
        onClose={() => setCopied(false)}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
};
