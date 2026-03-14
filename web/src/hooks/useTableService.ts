import { type NetworkLog } from '../../../src';
import { useState } from 'react';

const useTableService = () => {
  const [menuPosition, setMenuPosition] = useState<
    | {
        mouseX: number;
        mouseY: number;
      }
    | undefined
  >(undefined);

  const [contextLog, setContextLog] = useState<NetworkLog | undefined>(
    undefined
  );

  const handleContextMenu = (event: any, log: NetworkLog) => {
    event.preventDefault();
    setContextLog(log);
    setMenuPosition({ mouseX: event.clientX + 2, mouseY: event.clientY - 6 });
  };

  return {
    menuPosition,
    setMenuPosition,

    contextLog,
    handleContextMenu,
  };
};

export { useTableService };
