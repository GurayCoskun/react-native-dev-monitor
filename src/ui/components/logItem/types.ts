import type { NetworkLog } from '../../../core';

export type LogItemPropsType = {
  log: NetworkLog;
  onPress: () => void;
};
