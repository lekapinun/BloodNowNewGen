import Expo, { Font } from 'expo';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  AsyncStorage 
} from 'react-native';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import { FontAwesome } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen'

class App extends React.Component {
  state = {
    appIsReady: false,
    currentPage: 'login',
  };

  constructor(props) {
    super(props);
    timeLogIn = setInterval(() => {
      this._checkLogin();
    }, 2500);
  }

  componentWillMount() {
    this._loadAssetsAsync();
    this._userData();
  }

  async _checkLogin(){
    try {
      const value = await AsyncStorage.getItem('@Who:key');
      console.log(value);
      if (value === 'Loged'){
        this.setState({currentPage: 'app'});
        clearInterval(timeLogIn);
        console.log(this.state)
      }
    } catch ( error ) {
      console.log(error);
    }
  }

  async _userData(){
    try {
      await AsyncStorage.setItem('@Who:key', 'None');
    } catch ( error ) {
      console.log('error');
    }
  }

  async _loadAssetsAsync() {
  try {
    await cacheAssetsAsync({
      images: [
        require('./assets/images/expo-wordmark.png'),
        require('./assets/icons/logo.png'),
        require('./assets/images/expo-icon@2x.png'),
      ],
      fonts: [
        FontAwesome.font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
          { 'CmPrasanmit': require('./assets/fonts/CmPrasanmit.ttf') },
          { 'CmPrasanmitBold': require('./assets/fonts/CmPrasanmitBold.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if(this.state.appIsReady)
    {
      if(this.state.currentPage === 'login'){
        return (
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', backgroundColor: '#FAFAFA'}}>
            <LoginScreen />
          </View>
        );
      }
      else if(this.state.currentPage === 'register'){
        return (
          <View style={styles.container}>
            <Text>register</Text>
          </View>
        );
      }
      else if(this.state.currentPage === 'app'){
        return (
          <View style={styles.container}>
            <Text>app</Text>
          </View>
        );
      }
    }
    else 
    {
      return <Expo.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  
});

Expo.registerRootComponent(App);
