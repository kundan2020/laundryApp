import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const Api = {
  state: {
    userToken: null,
  },
  callTest(data) {
    console.log('data:', data);
  },
  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  },
  async retrieveItem(key) {
    try {
      await AsyncStorage.getItem(key).then(val => {
        console.log('retrieving', val);
        return val;
      });
      // const item = JSON.parse(retrievedItem);
      // return retrievedItem;
    } catch (error) {
      console.log(error.message);
    }
    // return false;
  },
  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
    this.goToHome();
  },
};
