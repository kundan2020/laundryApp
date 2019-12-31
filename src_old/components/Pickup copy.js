import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Pickup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      pickupRequests: [],
    };
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  componentDidMount = () => {
    this.setItems();
    // this.getAllPickupRequest();
    console.log(this.state.userToken);
    // .then(value => {
    // console.log('userToken', value);
    // this.setState({userToken: value});
    // this.getAllPickupRequest();
    // });
  };
  setItems() {
    AsyncStorage.multiGet(
      ['userToken', 'storeId', 'storeUserId'],
      (err, stores) => {
        stores.map((result, i, store) => {
          // let key = store[i][0];
          // let val = store[i][1];
          console.log('stores',stores);
        });
      },
    );

    // AsyncStorage.getItem('userToken').then(value => {
    //   // console.log('userToken', value);
    //   this.setState({userToken: value});
    // });
    // AsyncStorage.getItem('storeId').then(value => {
    //   // console.log('storeId', value);
    //   this.setState({storeId: value});
    // });
    // AsyncStorage.getItem('storeUserId').then(value => {
    //   // console.log('storeUserId', value);
    //   this.setState({storeUserId: value});
    //   this.getAllPickupRequest();
    // });
  }
  getAllPickupRequest() {
    console.log('this.state.userToken', this.state.userToken);
    fetch(
      'http://122.176.77.205:12008/oit-elaundry/api/auth/store/1/rider/2/pickup',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.state.userToken,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('pickups responseJson', responseJson);
        this.setState({pickupRequests: responseJson});
      });
  }
  // componentWillMount() {
  //   this.getAllPickupRequest();
  // }
  //handling onPress action
  getListViewItem = item => {
    // console.log(JSON.parse(item));
    Alert.alert(item.id);
  };

  render() {
    this.getAllPickupRequest();
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.pickupRequests}
          renderItem={({item}) => (
            <View style={styles.rowEach}>
              <View style={styles.leftPart}>
                {/* <Text
                  style={styles.item}
                  onPress={this.getListViewItem.bind(this, item)}>
                  {item.pickupRequest.id}
                </Text> */}
                <Text
                  style={styles.item}
                  onPress={this.getListViewItem.bind(this, item)}>
                  {item.pickupRequest.id +
                    ' - ' +
                    item.pickupRequest.customerDTO.firstName +
                    ' ' +
                    item.pickupRequest.customerDTO.lastName}
                </Text>
                <Text
                  style={styles.item}
                  onPress={this.getListViewItem.bind(this, item)}>
                  {item.pickupRequest.customerDTO.mobileNo}
                </Text>
                <Text
                  style={styles.item}
                  onPress={this.getListViewItem.bind(this, item)}>
                  {item.pickupRequest.pickupStatus}
                </Text>
              </View>
              {/* <View style={styles.rightPart}>
                <Text
                  style={styles.item}
                  onPress={this.getListViewItem.bind(this, item)}>
                  {item.pickupRequest.pickupStatus}
                </Text>
                <Text
                  style={styles.item}
                  onPress={this.getListViewItem.bind(this, item)}>
                  {item.pickupRequest.pickupStatus}
                </Text>
              </View> */}
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  rowEach: {
    // flex: 100,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // flexWrap: 'wrap',
  },
  leftPart: {
    // flex: 60,
  },
  rightPart: {
    // flex: 40,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => FlatListBasics);
