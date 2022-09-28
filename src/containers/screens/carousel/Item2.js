import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

// import Svg, {ClipPath, Defs, Image, Path} from 'react-native-svg';
import {
  Canvas,
  ImageShader,
  Image,
  useCanvasRef,
  Circle,
  Path,
  useImage,
  useComputedValue,
  interpolatePaths,
  interpolate,
} from '@shopify/react-native-skia';

import {ITEM_HEIGHT, ITEM_SPACING, ITEM_WIDTH} from './constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Item = ({item, progress}) => {
  const leftQ = useComputedValue(
    () =>
      interpolate(
        progress.current,
        [-1, 0, 1],
        [2 * ITEM_WIDTH, 1.5 * ITEM_WIDTH, ITEM_WIDTH],
      ),
    [progress],
  );

  useComputedValue(() => {
    console.log(progress.current);
    return progress.current;
  }, [progress]);

  const rightQ = useComputedValue(
    () =>
      interpolate(
        progress.current,
        [-1, 0, 1],
        [ITEM_WIDTH, ITEM_WIDTH / 2, 0],
      ),
    [progress],
  );

  const animatedPath = useComputedValue(() => {
    const path = `M ${ITEM_WIDTH / 2},0
        H ${1.5 * ITEM_WIDTH}
        Q ${leftQ.current},${ITEM_HEIGHT / 2}
        ${1.5 * ITEM_WIDTH},${ITEM_HEIGHT}
        H ${ITEM_WIDTH / 2}
        Q ${rightQ.current},${ITEM_HEIGHT / 2}
        ${ITEM_WIDTH / 2},0`;
    return path;
  }, [leftQ, rightQ]);

  const image = useImage(item.image);

  return (
    <View style={[styles.container]}>
      <Svg
        style={styles.svgContainer}
        height={ITEM_HEIGHT}
        width={2 * ITEM_WIDTH}
        viewBox={`0 0 ${2 * ITEM_WIDTH} ${ITEM_HEIGHT}`}>
        <Defs>
          <ClipPath id="clip">
            <Path
              d={`M ${ITEM_WIDTH / 2},0 
            H ${1.5 * ITEM_WIDTH} 
            Q ${ITEM_WIDTH},${ITEM_HEIGHT / 2} 
            ${1.5 * ITEM_WIDTH},${ITEM_HEIGHT} 
            H ${ITEM_WIDTH / 2} 
            Q 0,${ITEM_HEIGHT / 2} 
            ${ITEM_WIDTH / 2},0`}
            />
            <Path
              d={`M ${ITEM_WIDTH / 2},0 
            H ${1.5 * ITEM_WIDTH} 
            Q ${1.5 * ITEM_WIDTH},${ITEM_HEIGHT / 2} 
            ${1.5 * ITEM_WIDTH},${ITEM_HEIGHT} 
            H ${ITEM_WIDTH / 2} 
            Q ${ITEM_WIDTH / 2},${ITEM_HEIGHT / 2} 
            ${ITEM_WIDTH / 2},0`}
            />
            <Path
              d={`M ${ITEM_WIDTH / 2},0 
            H ${1.5 * ITEM_WIDTH} 
            Q ${2 * ITEM_WIDTH},${ITEM_HEIGHT / 2} 
            ${1.5 * ITEM_WIDTH},${ITEM_HEIGHT} 
            H ${ITEM_WIDTH / 2} 
            Q ${ITEM_WIDTH},${ITEM_HEIGHT / 2} 
            ${ITEM_WIDTH / 2},0`}
            />
            <AnimatedPath animatedProps={animatedProps} />
          </ClipPath>
        </Defs>
        <AnimatedPath animatedProps={animatedProps} fill="white" />
        <Image
          clipPath="url(#clip)"
          height={ITEM_HEIGHT}
          width={2 * ITEM_WIDTH}
          preserveAspectRatio="xMidYMid slice"
          href={item.image}
          x={0}
          y={0}
        />
      </Svg>
      {/* <Canvas style={styles.canvasContainer}> */}
      {/* <Path
          path={`M ${ITEM_WIDTH / 2},0 
            H ${1.5 * ITEM_WIDTH} 
            Q ${ITEM_WIDTH},${ITEM_HEIGHT / 2} 
            ${1.5 * ITEM_WIDTH},${ITEM_HEIGHT} 
            H ${ITEM_WIDTH / 2} 
            Q 0,${ITEM_HEIGHT / 2} 
            ${ITEM_WIDTH / 2},0`}
          color="white"> */}
      {/* <Path path={animatedPath} color="white" /> */}
      {/* <ImageShader
            image={image}
            fit="cover"
            rect={{x: 0, y: 0, width: 2 * ITEM_WIDTH, height: ITEM_HEIGHT}}
          /> */}
      {/* </Canvas> */}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: ITEM_SPACING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasContainer: {
    width: 2 * ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  image: {
    height: '100%',
  },
});
