import { type NetworkLog } from '../../../../core';

export type SidebarProps = {
  apilog: NetworkLog;
  onClose: () => void;
};
