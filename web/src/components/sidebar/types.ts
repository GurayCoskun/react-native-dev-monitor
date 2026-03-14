import { type NetworkLog } from '../../../../src';

export type SidebarProps = {
  apilog: NetworkLog;
  onClose: () => void;
};
