import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import Dimensions from 'Dimensions';
import {StyleSheet, Image} from 'react-native';

import bgSrc from '../images/wallpaper.png';

export default class Wallpaper extends Component {
  render() {
    return <Image style={styles.picture} source={bgSrc} />;
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    resizeMode: 'cover',
    width: undefined,
    height: undefined,
    backgroundColor: '#889DAD',
  },
});
