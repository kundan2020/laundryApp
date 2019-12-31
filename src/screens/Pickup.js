import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ActivityIndicator from '../components/ActivityIndicator';
import { Actions } from 'react-native-router-flux';

export default class Pickup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      storeId: null,
      storeUserId: null,
      pickupRequests: [],
      loading: true,
    };
  }
  renderSeparator = () => {
    return <View style={styles.separator} />;
  };
  componentDidMount = () => {
    this.setItems();
  };
  setItems = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const storeId = await AsyncStorage.getItem('storeId');
    const storeUserId = await AsyncStorage.getItem('storeUserId');
    this.setState({
      userToken: userToken,
      storeId: storeId,
      storeUserId: storeUserId,
    });
    this.getAllPickupRequest();
  };
  getAllPickupRequest() {
    const url = `http://122.176.77.205:12008/oit-elaundry/api/auth/store/${this.state.storeId}/rider/${this.state.storeUserId}/pickup`;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.userToken,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('pickups responseJson', responseJson);
        this.setState({
          pickupRequests: responseJson,
          loading: false,
        });
      });
  }
  componentWillMount() {
    // this.getAllPickupRequest();
  }
  //handling onPress action
  getListViewItem = item => {
    // console.log(JSON.parse(item));
    // Alert.alert(item.id.toString());
    Actions.pickupDetail({item: item});
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.pickupRequests}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.rowEach}
                onPress={this.getListViewItem.bind(this, item)}>
                <View style={styles.leftPart}>
                  <Text style={styles.item}>
                    {item.pickupRequest.id +
                      ' - ' +
                      item.pickupRequest.customerDTO.firstName +
                      ' ' +
                      item.pickupRequest.customerDTO.lastName}
                  </Text>
                  <Text style={styles.item}>
                    {item.pickupRequest.customerDTO.mobileNo}
                  </Text>
                  <Text style={styles.item}>
                    {item.pickupRequest.pickupStatus}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      );
    }
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
    color: '#fff',
  },
  rowEach: {
    backgroundColor: '#18BC9C',
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
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
});
