import { type NetworkLog } from '../../../../src/core';

export type TableRowContextMenuType = {
  log: NetworkLog;
  menuPosition?: {
    mouseX: number;
    mouseY: number;
  };

  close: () => void;
};
