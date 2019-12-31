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

class CustomerName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  render() {
    return (
      <View>
        <Text>Sumit Tewari</Text>
      </View>
    );
  }
}
export default CustomerName;
AppRegistry.registerComponent('CustomerName', () => CustomerName);

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
