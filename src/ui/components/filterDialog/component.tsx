import * as React from 'react';
import {
  type FilterCriteria,
  methodOptions,
  statusOptions,
} from '../../../../core';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from '../button/component';
import type { FilterDialogPropsType } from './types';

const isSelected = <T,>(current: T, value: T) => current === value;

export const FilterDialog = (props: FilterDialogPropsType) => {
  const { open, initialFilters, onClose, onApply } = props;

  const [localFilters, setLocalFilters] =
    React.useState<FilterCriteria>(initialFilters);

  React.useEffect(() => {
    if (!open) return;
    setLocalFilters(initialFilters);
  }, [open, initialFilters]);

  const reset = () => setLocalFilters({ status: 'all', method: '' });

  return (
    <Modal
      visible={open}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.safeArea} pointerEvents="box-none">
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <Button title="Reset" onPress={reset} />
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.options}>
              {statusOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      status: option.value,
                    }))
                  }
                  style={({ pressed }) => [
                    styles.option,
                    isSelected(localFilters.status, option.value) &&
                      styles.optionActive,
                    pressed && styles.optionPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected(localFilters.status, option.value) &&
                        styles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Method</Text>
            <View style={styles.options}>
              {methodOptions.map((option) => (
                <Pressable
                  key={option.label}
                  onPress={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      method: option.value,
                    }))
                  }
                  style={({ pressed }) => [
                    styles.option,
                    isSelected(localFilters.method, option.value) &&
                      styles.optionActive,
                    pressed && styles.optionPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected(localFilters.method, option.value) &&
                        styles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button title="Cancel" onPress={onClose} />
            <Button
              title="Apply"
              variant="fab"
              onPress={() => {
                onApply(localFilters);
                onClose();
              }}
              style={styles.applyButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  sheet: {
    borderRadius: 16,
    backgroundColor: '#0B1220',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    maxHeight: '85%',
  },
  header: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  content: {
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    color: '#93C5FD',
    fontWeight: '900',
    marginTop: 6,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  optionActive: {
    backgroundColor: 'rgba(37,99,235,0.25)',
    borderColor: 'rgba(147,197,253,0.65)',
  },
  optionPressed: {
    transform: [{ scale: 0.99 }],
  },
  optionText: {
    color: '#E5E7EB',
    fontWeight: '800',
  },
  optionTextActive: {
    color: '#DBEAFE',
  },
  footer: {
    padding: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  applyButton: {
    flex: 1,
  },
});
