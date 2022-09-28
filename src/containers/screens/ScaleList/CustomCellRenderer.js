import React from 'react';

import Animated from 'react-native-reanimated';
import useLayout from '../../../hooks/useLayout';

export const CustomCellRenderer = ({children, ...props}) => {
  const {onLayout, ...measurements} = useLayout();

  return (
    <Animated.View {...props} onLayout={onLayout}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            measurements,
          });
        }
        return child;
      })}
    </Animated.View>
  );
};
