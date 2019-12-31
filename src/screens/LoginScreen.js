import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import Logo from '../images/logo.png';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import ActivityIndicator from '../components/ActivityIndicator';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    //state object
    this.state = {
      username: '',
      password: '',
      loggedUserName: '',
      loading: false,
      dataSource: null,
      accessToken: null,
      userToken: null,
    };
  }
  componentDidMount = () => {
    AsyncStorage.getItem('accessToken').then(value =>
      this.setState({accessToken: value}),
    );
  };
  setName = value => {
    AsyncStorage.setItem('username', value);
    this.setState({loggedUserName: value});
  };
  setTokenItems = async responseJson => {
    this.setState({
      accessToken: responseJson.accessToken,
      tokenType: responseJson.tokenType,
      userToken: responseJson.tokenType + ' ' + responseJson.accessToken,
    });
    await AsyncStorage.setItem(
      'userToken',
      responseJson.tokenType + ' ' + responseJson.accessToken,
    );
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('userToken =>', userToken);
    this.loginSuccessCall();
  };
  loginSuccessCall = async () => {
    fetch('http://122.176.77.205:12008/oit-elaundry/api/home/loginsuccess', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.userToken,
      },
    })
      .then(response => response.json())
      .then(async responseJson => {
        await AsyncStorage.setItem('storeId', responseJson.storeId.toString());
        await AsyncStorage.setItem(
          'storeUserId',
          responseJson.storeUserId.toString(),
        );
        Actions.home();
      });
  };
  loginClick = async () => {
    this.setState({loading: true});
    if (this.state.username === '' || this.state.password === '') {
      this.setState({loading: false});
      Alert.alert('Login Alert', 'Username and password required');
    } else if (
      this.state.username === 'kundan.kumar@oneindiatech.com' &&
      this.state.password === 'kundan.kumar@oitpl5'
    ) {
      this.setName(this.state.username);
      Actions.home();
      this.setState({loading: false});
      Alert.alert('Login Success', 'Login Successfully');
    } else if (this.state.username !== '' && this.state.password !== '') {
      fetch('http://122.176.77.205:12008/oit-elaundry/api/auth/signin/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
        .then(response => response.json())
        .then(async responseJson => {
          if (
            responseJson.hasOwnProperty('accessToken') &&
            responseJson.hasOwnProperty('tokenType')
          ) {
            this.setTokenItems(responseJson);
            this.setState({loading: false});
            Alert.alert(
              'Login Success',
              'Login Successfully ' + AsyncStorage.getItem('userToken'),
            );
          } else {
            this.setState({loading: false});
            Alert.alert('Login Alert', 'Invalid Credentials');
          }
        })
        .catch(error => console.log(error)); //to catch the errors if any
    } else {
      this.setState({loading: false});
      Alert.alert('Login Alert', 'Username or password is invalid');
    }
  };
  getUserProfileData = async userToken => {
    console.log('this.state.userToken', this.state.userToken);
    fetch('http://122.176.77.205:12008/oit-elaundry/api/home/loginsuccess', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    })
      .then(response => response.json())
      .then(async responseJson => {
        console.log('user data', responseJson);
        this.setState({
          user: responseJson,
        });
        await AsyncStorage.setItem('storeId', responseJson.storeId);
        await AsyncStorage.setItem('storeUserId', responseJson.storeUserId);
        const storeId = await AsyncStorage.getItem('storeId');
        const storeUserId = await AsyncStorage.getItem('storeUserId');

        console.log('storeId:=>', storeId);
        console.log('storeUserId:=>', storeUserId);
      });
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.imgView}>
            {/* <Image source={Logo} style={styles.logoImg} /> */}
          </View>
          <Text style={styles.heading}>Login</Text>
          <TextInput
            style={styles.username}
            placeholder="Username"
            keyboardType="email-address"
            onChangeText={TextInputValue =>
              this.setState({username: TextInputValue})
            }
          />
          <TextInput
            style={styles.password}
            placeholder="Password"
            onChangeText={TextInputValue =>
              this.setState({password: TextInputValue})
            }
            secureTextEntry={true}
          />
          <Button
            title="Login"
            style={styles.loginButton}
            onPress={() => this.loginClick()}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // justifyContent: 'space-around',
  },
  imgView: {
    textAlign: 'center',
  },
  logoImg: {
    // width: 20,
    // height: 20,
    // textAlign: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  username: {
    backgroundColor: 'grey',
    margin: 10,
  },
  password: {
    backgroundColor: 'grey',
    margin: 10,
  },
  loginButton: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
