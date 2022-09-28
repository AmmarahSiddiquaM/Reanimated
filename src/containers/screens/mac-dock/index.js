import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../../assets/images';
import {Text} from '../../../components/atoms';
import {dimensions, spacing} from '../../../theme';

import DockItem from './DocItem';

export const menus = [
  {
    name: 'Finder',
    image: images['mac-icons'].finder,
  },
  {
    name: 'Safari',
    image: images['mac-icons'].safari,
  },
  {
    name: 'Messages',
    image: images['mac-icons'].messages,
  },
  {
    name: 'Mail',
    image: images['mac-icons'].mail,
  },
  {
    name: 'Maps',
    image: images['mac-icons'].maps,
  },
  {
    name: 'Photos',
    image: images['mac-icons'].photos,
  },
  {
    name: 'FaceTime',
    image: images['mac-icons'].facetime,
  },
  {
    name: 'Calendar',
    image: images['mac-icons'].calendar,
  },
  {
    name: 'Settings',
    image: images['mac-icons'].settings,
  },
];

export const ITEM_SIZE =
  (dimensions.screenWidth - 2 * spacing.s) / menus.length;

const MacDock = () => {
  const tapRef = useRef();
  const panRef = useRef();

  const isGestureActive = useSharedValue(0);
  const offsetX = useSharedValue(0);

  const currentIndex = useDerivedValue(() => {
    return offsetX.value / ITEM_SIZE;
  }, [offsetX]);

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: ({x}, ctx) => {
      ctx.isActive = true;
      isGestureActive.value = withTiming(1, null, () => {
        offsetX.value = withTiming(x);
      });
    },
    onActive: ({x}, ctx) => {
      if (ctx.isActive) {
        offsetX.value = x;
      }
    },
    onEnd: (_, ctx) => {
      ctx.isActive = false;
      isGestureActive.value = withTiming(0);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text size="xl" color="black" weight="medium" style={styles.title}>
          macOS Dock
        </Text>
        <View style={styles.dockContainer}>
          <PanGestureHandler
            ref={panRef}
            simultaneousHandlers={tapRef}
            onGestureEvent={onPanGestureEvent}>
            <Animated.View style={styles.dock}>
              {menus.map((item, index) => (
                <DockItem
                  key={index}
                  item={item}
                  index={index}
                  size={ITEM_SIZE}
                  currentIndex={currentIndex}
                  isGestureActive={isGestureActive}
                />
              ))}
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MacDock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.s,
  },
  title: {
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: spacing.s,
  },
  dockContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: spacing.s,
  },
  dock: {
    flexDirection: 'row',
    height: ITEM_SIZE,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
