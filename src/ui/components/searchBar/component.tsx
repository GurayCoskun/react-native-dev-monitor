import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { type SearchBarPropsType } from './types';

export const SearchBar = (props: SearchBarPropsType) => {
  const { value, onChange, placeholder } = props;

  return (
    <View style={styles.root}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder ?? 'Search...'}
        placeholderTextColor="#94A3B8"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={() => onChange('')}
          style={({ pressed }) => [
            styles.clear,
            pressed && styles.clearPressed,
          ]}
        >
          <Text style={styles.clearText}>X</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  input: {
    flex: 1,
    color: '#E5E7EB',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontWeight: '600',
  },
  clear: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  clearPressed: {
    transform: [{ scale: 0.98 }],
  },
  clearText: {
    color: '#E5E7EB',
    fontWeight: '900',
  },
});
