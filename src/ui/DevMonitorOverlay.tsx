import * as React from 'react';
import { BackHandler, Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from './components/button/component';
import { LogDetail } from './components/logDetail/component';
import { LogList } from './components/logList/component';
import { useDevMonitorLogs } from './utils/hooks';

type DevMonitorOverlayProps = {
  mode?: 'fullscreen' | 'mini';
};

export const DevMonitorOverlay = (props: DevMonitorOverlayProps) => {
  const { mode = 'fullscreen' } = props;

  const { logs, clearLogs, selectedLog, setSelectedLog } = useDevMonitorLogs();

  const [open, setOpen] = React.useState(mode === 'fullscreen');

  React.useEffect(() => {
    const onBack = () => {
      if (selectedLog) {
        setSelectedLog(undefined);
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBack
    );

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLog]);

  if (!__DEV__) return null;

  const content = (
    <View style={styles.modalRoot}>
      <View style={styles.modalHeader}>
        {mode === 'mini' ? (
          <Button title="Close" onPress={() => setOpen(false)} />
        ) : null}
        <Text style={styles.headerTitle}>Network Logs</Text>
        <Button
          title="Clear"
          variant="danger"
          onPress={() => {
            setSelectedLog(undefined);
            clearLogs();
          }}
        />
      </View>

      {selectedLog ? (
        <LogDetail
          onPressBack={() => setSelectedLog(undefined)}
          log={selectedLog}
        />
      ) : (
        <LogList logs={logs} onPressItem={(item) => setSelectedLog(item)} />
      )}
    </View>
  );

  return (
    <>
      <View pointerEvents="box-none" style={styles.fabContainer}>
        {mode === 'mini' ? (
          <Button
            variant="fab"
            title={`Logs ${logs.length}`}
            onPress={() => setOpen(true)}
          />
        ) : null}
      </View>
      {mode === 'mini' ? (
        <Modal
          visible={open}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setOpen(false)}
        >
          {content}
        </Modal>
      ) : (
        content
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    zIndex: 9999,
  },
  modalRoot: {
    flex: 1,
    backgroundColor: '#0B1220',
    paddingTop: 12,
  },
  modalHeader: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});
