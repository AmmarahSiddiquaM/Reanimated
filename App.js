import 'react-native-gesture-handler';
import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {StatusBar} from './src/components/atoms';
import Navigator from './src/containers/navigators';
import {colors} from './src/theme';

import store from './src/store';

LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar barStyle="dark-content" />
          <Navigator />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
