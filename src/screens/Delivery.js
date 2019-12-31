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

export default class Pickup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      storeId: null,
      storeUserId: null,
      deliveryRequests: [],
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
    this.getAlldeliveryRequest();
  };
  getAlldeliveryRequest() {
    const url = `http://122.176.77.205:12008/oit-elaundry/api/auth/store/${this.state.storeId}/rider/${this.state.storeUserId}/delivery`;
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
        this.setState({
          deliveryRequests: responseJson,
          loading: false,
        });
      });
  }
  componentWillMount() {
    // this.getAlldeliveryRequest();
  }
  //handling onPress action
  getListViewItem = item => {
    // console.log(JSON.parse(item));
    Alert.alert(item.id.toString());
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.deliveryRequests}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.rowEach}
                onPress={this.getListViewItem.bind(this, item)}>
                <View style={styles.leftPart}>
                  <Text style={styles.item}>
                    {item.deliveryRequest.id +
                      ' - ' +
                      item.deliveryRequest.customerDTO.firstName +
                      ' ' +
                      item.deliveryRequest.customerDTO.lastName}
                  </Text>
                  <Text style={styles.item}>
                    {item.deliveryRequest.customerDTO.mobileNo}
                  </Text>
                  <Text style={styles.item}>
                    {item.deliveryRequest.pickupStatus}
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
    color: '#001217',
  },
  rowEach: {
    backgroundColor: 'rgba(5, 165, 209, 0.25)',
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
