import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import LoginScreen from './components/LoginScreen';
import Home from './src/Home.js';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="home" component={Home} title="Home Screen" initial={true} />
      <Scene
        key="loginScreen"
        component={LoginScreen}
        title="LoginScreen"
        initial={false}
      />
    </Scene>
  </Router>
);
export default Routes;
