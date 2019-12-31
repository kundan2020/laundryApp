import React, {Component} from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
  Picker,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export default class PickupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      storeId: null,
      storeUserId: null,
      item: props.item,
      categories: [],
      category: null,
      categoryIndex: null,
      api_url: 'http://122.176.77.205:12008/oit-elaundry/api/',
    };
    // console.log('props available here', props.item.id);
  }
  componentDidMount() {
    this.setItems();
  }
  setItems = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const storeId = await AsyncStorage.getItem('storeId');
    const storeUserId = await AsyncStorage.getItem('storeUserId');
    this.setState({
      userToken: userToken,
      storeId: storeId,
      storeUserId: storeUserId,
    });
    this.getCategoryList();
  };
  getCategoryList() {
    const url =
      this.state.api_url + 'auth/store/garment-category/' + this.state.storeId;
    // console.log('url', url);
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.userToken,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        this.setState({categories: responseJson});
      });
  }
  updateCategory = cat => {
    this.setState({category: cat});
  };

  GetPickerSelectedItemValue = () => {
    if (this.state.category) {
      // if (Alert.confirm(this.state.category)) {
      //   Alert.alert('ok');
      // }
      Alert.alert(
        'Confirm Category',
        'You selected ' +
          this.state.categories[this.state.categoryindex].categoryName,
        [
          {
            text: 'NO',
            onPress: () => console.log('NO Pressed'),
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              console.log('YES Pressed');
              Actions.pickupOrderSubCateory({category: this.state.category});
            },
          },
        ],
      );
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.heading}>Select Category</Text>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(itemValue, itemIndex) => {
            // console.warn('itemIndex', itemIndex);
            this.setState({
              category: itemValue,
              categoryindex: itemIndex,
            });
          }}>
          {this.state.categories.map(cat => {
            return (
              <Picker.Item label={cat.categoryName} value={cat.id.toString()} />
            );
          })}
        </Picker>
        <Button title="Save & Next" onPress={this.GetPickerSelectedItemValue} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
  heading: {
    // padding: 10,
    fontSize: 18,
    // height: 44,
  },
});
