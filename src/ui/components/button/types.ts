import type { StyleProp, ViewStyle } from 'react-native';

export type Variant = 'ghost' | 'danger' | 'fab';

export type ButtonPropsType = {
  title?: string;
  onPress?: () => void;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
};
