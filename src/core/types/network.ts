export interface NetworkLog {
  id: string;
  url: string;
  method: string;
  requestHeaders: Record<string, string>;
  requestBody?: any;
  responseHeaders?: Record<string, string>;
  responseBody?: any;
  status?: number;
  startTime: number;
  endTime?: number;
  duration?: number;
  type: 'xhr' | 'fetch';
}

export type StatusFilter =
  | 'all'
  | 'pending'
  | 'success'
  | 'redirect'
  | 'clientError'
  | 'serverError';

export type FilterCriteria = {
  status: StatusFilter;
  method: '' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
};
