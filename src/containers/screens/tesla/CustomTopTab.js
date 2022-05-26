import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import DummyTabButton from './DummyTabButton';
import TabBar from './TabBar';

const CustomTopTab = ({routes, activeIndex, tabStyle, onPressTab}) => {
  const [measurements, setMeasurements] = useState({});

  const onMeasure = (index, values) => {
    setMeasurements(prevState => ({
      ...prevState,
      [index]: values,
    }));
  };

  return (
    <View style={[styles.tabBarContainer, tabStyle]}>
      <View style={styles.behindTabBar}>
        {routes.map((route, index) => (
          <DummyTabButton
            onMeasure={onMeasure}
            tabBarLabel={route.tabBarLabel}
            tabBarIcon={route.tabBarIcon}
            index={index}
          />
        ))}
      </View>
      {Object.keys(measurements).length === routes.length && (
        <TabBar
          activeIndex={activeIndex}
          measurements={Object.values(measurements)}
          routes={routes}
          onPressTab={onPressTab}
        />
      )}
    </View>
  );
};

export default CustomTopTab;

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 36,
    width: '100%',
    zIndex: 999,
  },
  behindTabBar: {
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
    opacity: 0,
  },
});
