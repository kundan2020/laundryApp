import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
// import {Helper} from '../utils/Helper';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      user: [],
    };
  }
  componentDidMount = () => {
    // console.log('Helper',await Helper.retrieveItem('userToken'));
    AsyncStorage.getItem('userToken').then(value => {
      //   console.log('userToken', value);
      this.setState({userToken: value});
      this.getUserProfileData();
    });
  };
  getUserProfileData() {
    // console.log('this.state.userToken', this.state.userToken);
    fetch('http://122.176.77.205:12008/oit-elaundry/api/home/loginsuccess', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.userToken,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('user data', responseJson);
        this.setState({
          user: responseJson,
        });
      });
  }
  goToHome() {
    Actions.loginScreen();
  }
  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
    this.goToHome();
  };
  services = services => {
    let servicesList = '';
    for (let i = 0; i < services.length; i++) {
      const element = services[i];
      servicesList += element + ', ';
    }
    return servicesList;
  };
  render() {
    const user = this.state.user;
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
        />
        <ScrollView style={styles.body}>
          <View>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{user.userName}</Text>
              <Text style={styles.info}>
                {user.role + ' - ' + user.mobileNo}
              </Text>
              {/* <Text style={styles.description}>{JSON.stringify(user.services)}</Text> */}
              <Text>Active Status: {user.enabled ? 'Active' : 'Inactive'}</Text>
              <Text>Brand Id: {user.brandId}</Text>
              <Text>Store User Id: {user.storeUserId}</Text>
              <Text>Store Id: {user.storeId}</Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.clearAll()}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  //   name: {
  //     fontSize: 22,
  //     color: '#FFFFFF',
  //     fontWeight: '600',
  //   },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});
