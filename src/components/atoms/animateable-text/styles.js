import {StyleSheet} from 'react-native';
import {colors, typography} from '@app/theme';

export const createStyles = theme =>
  StyleSheet.create({
    text: (color, size, weight) => ({
      color: color || colors[theme].black,
      fontSize: size,
      fontFamily: typography.primary[weight],
      lineHeight: Math.round(1.5 * size),
    }),
  });
