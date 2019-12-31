import React, {Component} from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StyleSheet,
  SectionList,
  Button,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loggedUserName: '',
    splashTimeOut: 1000,
    userToken: null,
  };
  componentDidMount = () => {
    this.CheckForLogin();
  };
  CheckForLogin() {
    AsyncStorage.getItem('userToken').then(value => {
      this.setState({userToken: value});
      if (this.state.userToken) {
        setTimeout(() => {
          Actions.home();
        }, this.state.splashTimeOut);
        Alert.alert('this.state.userToken', this.state.userToken);
      } else {
        Actions.loginScreen();
        setTimeout(() => {
          Actions.loginScreen();
        }, this.state.splashTimeOut);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>LAUNDARY APP</Text>
      </View>
    );
  }
}
export default SplashScreen;
AppRegistry.registerComponent('SplashScreen', () => SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'blue',
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
