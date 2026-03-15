import { type NetworkLog } from '../../../../core';

export type TableRowContextMenuType = {
  log: NetworkLog;
  menuPosition?: {
    mouseX: number;
    mouseY: number;
  };

  close: () => void;
};
