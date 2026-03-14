export * from './core';
export * from './ui';

import type { NetworkLog } from './core';
import { NetworkInterceptor } from './interceptor/networkInterceptor';
import { sendNetworkLog } from './socket';
import { upsertLog } from './ui/utils/store';

if (__DEV__) {
  console.log('🚀 [DevMonitor] Network monitoring started...');

  const onLog = (log: NetworkLog) => {
    upsertLog(log);
    sendNetworkLog(log);
  };

  NetworkInterceptor.install(onLog);
}
