import { type NetworkLog } from '../../../../src/core';

export type SidebarProps = {
  apilog: NetworkLog;
  onClose: () => void;
};
