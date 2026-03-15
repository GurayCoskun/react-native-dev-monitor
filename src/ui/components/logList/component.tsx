import * as React from 'react';
import type { FilterCriteria } from '../../../../core';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { LogListPropsType } from './types';
import { LogItem } from '../logItem/component';
import { SearchBar } from '../searchBar/component';
import { FilterDialog } from '../filterDialog/component';

export const LogList = (props: LogListPropsType) => {
  const { logs = [], onPressItem } = props;

  const [query, setQuery] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    status: 'all',
    method: '',
  });

  const isFilterApplied =
    filterCriteria.status !== 'all' || filterCriteria.method !== '';

  const filteredLogs = React.useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const matchesStatus = (log: any) => {
      switch (filterCriteria.status) {
        case 'pending':
          return log.status === undefined;
        case 'success':
          return (
            log.status !== undefined && log.status >= 200 && log.status < 300
          );
        case 'redirect':
          return (
            log.status !== undefined && log.status >= 300 && log.status < 400
          );
        case 'clientError':
          return (
            log.status !== undefined && log.status >= 400 && log.status < 500
          );
        case 'serverError':
          return log.status !== undefined && log.status >= 500;
        default:
          return true;
      }
    };

    const matchesMethod = (log: any) => {
      if (!filterCriteria.method) return true;
      return String(log.method ?? '').toUpperCase() === filterCriteria.method;
    };

    return logs.filter((log) => {
      const url = String(log.url ?? '').toLowerCase();
      const method = String(log.method ?? '').toLowerCase();
      const matchesQuery =
        !normalized || url.includes(normalized) || method.includes(normalized);
      return matchesQuery && matchesStatus(log) && matchesMethod(log);
    });
  }, [logs, query, filterCriteria]);

  return (
    <React.Fragment>
      <View style={styles.header}>
        <View style={styles.search}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search by URL or method..."
          />
        </View>
        <Pressable
          onPress={() => setFilterOpen(true)}
          style={({ pressed }) => [
            styles.filterButton,
            pressed && styles.filterPressed,
          ]}
        >
          <Text style={styles.filterText}>Filter</Text>
          {isFilterApplied ? <View style={styles.filterDot} /> : null}
        </Pressable>
      </View>
      <FlatList
        style={styles.container}
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          filteredLogs.length === 0 ? styles.emptyList : styles.contentContainer
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Waiting for API calls...</Text>
        }
        renderItem={({ item }) => {
          return <LogItem log={item} onPress={() => onPressItem(item)} />;
        }}
      />

      <FilterDialog
        open={filterOpen}
        initialFilters={filterCriteria}
        onClose={() => setFilterOpen(false)}
        onApply={setFilterCriteria}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 12,
  },
  search: {
    flex: 1,
  },
  filterButton: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  filterPressed: {
    transform: [{ scale: 0.99 }],
  },
  filterText: {
    color: '#E5E7EB',
    fontWeight: '900',
  },
  filterDot: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#EF4444',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    color: '#9CA3AF',
    fontWeight: '700',
  },
});
