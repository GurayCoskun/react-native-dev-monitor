import type { NetworkLog } from '../../../../core';

export type LogListPropsType = {
  logs: NetworkLog[];
  onPressItem: (log: NetworkLog) => void;
};
