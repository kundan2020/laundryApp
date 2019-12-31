import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
import Routes from './Routes.js';

class reactTutorialApp extends Component {
  render() {
    return <Routes />;
  }
}
export default reactTutorialApp;
AppRegistry.registerComponent('reactTutorialApp', () => reactTutorialApp);

// import React, {Component} from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   Image,
// } from 'react-native';

// // import Logo from './src/images/logo.png';

// import LoginScreen from './src/components/LoginScreen';

// // import Main from './src/components/Main';
// // import Routes from './src/Routes';

// export default class App extends Component {
//   render() {
//     return <LoginScreen />;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   imgView: {
//     textAlign: 'center',
//   },
//   logoImg: {
//     // width: 20,
//     // height: 20,
//     // textAlign: 'center',
//   },
//   heading: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   username: {
//     backgroundColor: 'grey',
//     margin: 10,
//   },
//   password: {
//     backgroundColor: 'grey',
//     margin: 10,
//   },
//   loginButton: {
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
// });

// AppRegistry.registerComponent('App', () => App);
