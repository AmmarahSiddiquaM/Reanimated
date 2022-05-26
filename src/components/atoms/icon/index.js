import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

import {icons} from '../../../assets/icons';
import {colors} from '../../../theme';

class Icon extends React.Component {
  render() {
    const {name, size = 22, color = colors.primary, style} = this.props;
    return (
      <View
        style={[
          {
            width: size,
            height: size,
          },
          style,
        ]}>
        <Image style={styles.image(color)} source={icons[name]} />
      </View>
    );
  }
}

export default Icon;

const styles = StyleSheet.create({
  image: color => ({
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: color,
  }),
});
