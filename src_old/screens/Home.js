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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

class Home extends Component {
  constructor(props) {
    super(props);
    this.getDataList();
    this.state = {
      dataList: [],
    };
  }
  getDataList() {
    // fetch('https://jsonplaceholder.typicode.com/todos')
    //   .then(response => response.json())
    //   .then(json => {
    //     this.setState({
    //       dataList: json,
    //     });
    //     console.log(json);
    //   });
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

  render() {
    return (
      // <View
      //   style={{
      //     flex: 1,
      //     flexDirection: 'column',
      //     justifyContent: 'space-around',
      //   }}>
      //   <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
      //   <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
      //   <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      // </View>
      <View style={styles.container}>
        {/* <Button
          title="User Profile"
          style={styles.pickup}
          onPress={() => Actions.UserProfile()}
        /> */}
        {/* <Button title="Delivery" style={styles.delivery} />
        <Button title="Logout" style={styles.logout} /> */}
        <View>
          <TouchableOpacity
            onPress={() => Actions.pickup()}
            style={styles.pickup}>
            <Text style={styles.pickupText}>Pickup</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => Actions.delivery()}
            style={styles.delivery}>
            <Text style={styles.deliveryText}>Delivery</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => Actions.UserProfile()}
            style={styles.profile}>
            <Text style={styles.profileText}>User Profile</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.clearAll()}
            style={styles.logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        /> */}
      </View>
    );
  }
}
export default Home;
AppRegistry.registerComponent('Home', () => Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  pickup: {
    backgroundColor: 'green',
    color: '#fff',
    justifyContent: 'center',
    margin: 20,
    padding: 40,
  },
  pickupText: {
    textAlign: 'center',
    color: '#fff',
    margin: 10,
    fontSize: 30,
  },
  delivery: {
    backgroundColor: 'blue',
    color: '#fff',
    justifyContent: 'center',
    margin: 20,
    padding: 40,
  },
  deliveryText: {
    textAlign: 'center',
    color: '#fff',
    margin: 10,
    fontSize: 30,
  },
  profile: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    margin: 20,
    padding: 10,
  },
  profileText: {
    textAlign: 'center',
    color: '#fff',
    margin: 10,
    fontSize: 30,
  },
  logout: {
    backgroundColor: 'red',
    justifyContent: 'center',
    margin: 20,
    padding: 10,
  },
  logoutText: {
    textAlign: 'center',
    color: '#fff',
    margin: 10,
    fontSize: 20,
  },
});
