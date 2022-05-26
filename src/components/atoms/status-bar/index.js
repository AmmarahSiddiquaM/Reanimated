import React from 'react';
import {
  Platform,
  StatusBar as RNStatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors} from '../../../theme';

const StatusBar = ({backgroundColor = colors.background, ...props}) => {
  const {top} = useSafeAreaInsets();

  if (Platform.OS === 'ios') {
    <View style={styles.container(top, backgroundColor)}>
      <RNStatusBar {...props} />
    </View>;
  }
  return <RNStatusBar backgroundColor={backgroundColor} {...props} />;
};

export default StatusBar;

const styles = StyleSheet.create({
  container: (top, backgroundColor) => ({
    position: 'absolute',
    height: top,
    width: '100%',
    backgroundColor,
    zIndex: 999,
  }),
});
