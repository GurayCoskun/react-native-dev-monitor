import { type FilterCriteria } from '../types';

const statusOptions: Array<{ label: string; value: FilterCriteria['status'] }> =
  [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: '2xx Success', value: 'success' },
    { label: '3xx Redirect', value: 'redirect' },
    { label: '4xx Client Error', value: 'clientError' },
    { label: '5xx Server Error', value: 'serverError' },
  ];

const methodOptions: Array<{ label: string; value: FilterCriteria['method'] }> =
  [
    { label: 'All', value: '' },
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'PATCH', value: 'PATCH' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'OPTIONS', value: 'OPTIONS' },
    { label: 'HEAD', value: 'HEAD' },
  ];

export { statusOptions, methodOptions };
