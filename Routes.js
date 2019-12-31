import React from 'react';
import {Router, Scene, ActionConst} from 'react-native-router-flux';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import Home from './src/screens/Home';
import UserProfile from './src/screens/UserProfile';
import Pickup from './src/screens/Pickup';
import PickupDetail from './src/screens/pickupOrder';
import Delivery from './src/screens/Delivery';
import PickupOrderSubCat from './src/screens/pickupOrderSubCat';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="splashScreen"
        component={SplashScreen}
        title="Splash Screen"
        initial={true}
        hideNavBar={true}
      />
      <Scene
        key="loginScreen"
        component={LoginScreen}
        title="Login"
        initial={false}
        hideNavBar={true}
        type={ActionConst.RESET}
      />
      <Scene
        key="home"
        // onBack={() => Actions.home()}
        component={Home}
        title="Home"
        initial={false}
        hideNavBar={true}
        type={ActionConst.RESET}
      />
      <Scene key="pickup" component={Pickup} title="Pickup" />
      <Scene key="delivery" component={Delivery} title="Delivery" />
      <Scene key="pickupDetail" component={PickupDetail} title="Pickup Order" />
      <Scene key="UserProfile" component={UserProfile} title="User Profile" />
      <Scene
        key="pickupOrderSubCateory"
        component={PickupOrderSubCat}
        title="Pickup Order Sub Category"
      />
    </Scene>
  </Router>
);
export default Routes;
