import { Pressable, View, Text } from 'react-native';
import type { LogItemPropsType } from './types';
import { StyleSheet } from 'react-native';
import { formatDuration, getLogColors } from '../../../core';

export const LogItem = (props: LogItemPropsType) => {
  const { log, onPress } = props;

  const colors = getLogColors(log);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.rowTop}>
        <Text style={[styles.method, { color: colors?.statusColor }]}>
          {String(log.method ?? '').toUpperCase()}
        </Text>
        <Text
          style={[styles.status, { color: colors?.statusColor }]}
          numberOfLines={1}
        >
          {log.status ?? 'Pending'}
        </Text>
        <Text style={[styles.time, { color: colors?.responseTimeColor }]}>
          {formatDuration(log)}
        </Text>
      </View>
      <Text style={styles.url} numberOfLines={2}>
        {log.url ?? ''}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.28)',
  },
  rowPressed: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  method: {
    width: 70,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  status: {
    color: '#E5E7EB',
    flex: 1,
    textAlign: 'right',
    fontWeight: '700',
  },
  time: {
    width: 100,
    textAlign: 'right',
    fontWeight: '800',
  },
  url: {
    marginTop: 6,
    color: '#CBD5E1',
  },
});
