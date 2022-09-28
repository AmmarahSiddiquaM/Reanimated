/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback} from 'react';
import {useSharedValue} from 'react-native-reanimated';

const useLayout = () => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: {height: lHeight, width: lWidth, x: lX, y: lY},
      },
    }) => {
      height.value = lHeight;
      width.value = lWidth;
      x.value = lX;
      y.value = lY;
    },
    [],
  );

  return {
    onLayout,
    height,
    width,
    x,
    y,
  };
};

export default useLayout;
