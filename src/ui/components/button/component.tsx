import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import type { ButtonPropsType, Variant } from './types';

export function Button(props: ButtonPropsType) {
  const { title, onPress, variant = 'ghost', style } = props;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, variantStyles[variant], style]}
    >
      <Text style={[styles.text, textStyles[variant]]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '700',
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  ghost: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  danger: {
    backgroundColor: '#B91C1C',
  },
  fab: {
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
};

const textStyles: Record<Variant, any> = {
  ghost: { color: '#E5E7EB' },
  danger: { color: '#fff' },
  fab: { color: '#fff' },
};
