import { type NetworkLog } from '../../../../src';

export type TableRowContextMenuType = {
  log: NetworkLog;
  menuPosition?: {
    mouseX: number;
    mouseY: number;
  };

  close: () => void;
};
