import * as React from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const MyComponent = props => (
  <ActivityIndicator
    style={styles.ActivityIndicator}
    animating={true}
    color={Colors.red800}
    size={'large'}
  />
);

export default MyComponent;
const styles = StyleSheet.create({
  ActivityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
