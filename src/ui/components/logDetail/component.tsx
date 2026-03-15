import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { LogDetailPropsType } from './types';
import { Button } from '../button/component';
import {
  formatDuration,
  getQueryParams,
  stringifyValue,
} from '../../../../core';

export const LogDetail = (props: LogDetailPropsType) => {
  const { log, onPressBack } = props;

  const titleForLog = () => {
    const url = String(log.url ?? '');
    try {
      const parsed = new URL(url);
      return parsed.pathname ? parsed.pathname : url;
    } catch {
      return url;
    }
  };

  return (
    <View style={styles.detailsRoot}>
      <View style={styles.detailsHeader}>
        <Button title="Back" onPress={onPressBack} />
        <Text style={styles.detailsTitle} numberOfLines={1}>
          {titleForLog()}
        </Text>
        <View style={styles.headerButtonSpacer} />
      </View>
      <ScrollView contentContainerStyle={styles.detailsContent}>
        <View style={styles.section}>
          <Text style={styles.detailsTitle} numberOfLines={1}>
            Request Information
          </Text>
          <Text style={styles.detailsLabel}>URL</Text>
          <Text style={styles.detailsValue} selectable>
            {String(log.url ?? '')}
          </Text>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowItem}>
              <Text style={styles.detailsLabel}>Method</Text>
              <Text style={styles.detailsValue}>
                {String(log.method ?? '')}
              </Text>
            </View>
            <View style={styles.detailsRowItem}>
              <Text style={styles.detailsLabel}>Status</Text>
              <Text style={styles.detailsValue}>{log.status ?? 'Pending'}</Text>
            </View>
            <View style={styles.detailsRowItem}>
              <Text style={styles.detailsLabel}>Time</Text>
              <Text style={styles.detailsValue}>{formatDuration(log)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.detailsLabel}>Request Query</Text>
          <Text style={styles.detailsValue} selectable>
            {stringifyValue(getQueryParams(log.url!))}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.detailsLabel}>Request Headers</Text>
          <Text style={styles.detailsValue} selectable>
            {stringifyValue(log.requestHeaders)}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.detailsLabel}>Request Body</Text>
          <Text style={styles.detailsValue} selectable>
            {stringifyValue(log.requestBody)}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.detailsLabel}>Response Body</Text>
          <Text style={styles.detailsValue} selectable>
            {stringifyValue(log.responseBody)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 12,
  },
  headerButtonSpacer: {
    width: 56,
  },
  detailsRoot: {
    flex: 1,
  },
  detailsHeader: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  detailsTitle: {
    color: '#fff',
    fontWeight: '800',
    flex: 1,
  },
  detailsContent: {
    paddingHorizontal: 14,
  },
  detailsLabel: {
    color: '#93C5FD',
    fontWeight: '900',
    marginTop: 6,
  },
  detailsValue: {
    color: '#E5E7EB',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  detailsRowItem: {
    flex: 1,
  },
});
