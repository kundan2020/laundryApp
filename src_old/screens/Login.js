import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

const Login = () => {
  const goToHome = () => {
    Actions.home();
  };
  return (
    <TouchableOpacity onPress={goToHome}>
      <Text>This is Login</Text>
    </TouchableOpacity>
  );
};
export default Login;
