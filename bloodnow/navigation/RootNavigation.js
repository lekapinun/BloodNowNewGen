import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
  ExNavigationState,
} from '@expo/ex-navigation';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons, 
 } from '@expo/vector-icons';
import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';
import { TestButton, NavigatorBackground } from '../components/common';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="profile">
        <TabNavigationItem
          id="profile"
          renderIcon={isSelected => this._renderIconSimpleLineIcons('user', isSelected)}>
          <StackNavigation initialRoute="profile" />
        </TabNavigationItem>

        <TabNavigationItem
          id="requestBloodHistory"
          renderIcon={isSelected => this._renderIconSimpleLineIcons('heart', isSelected)}>
          <StackNavigation initialRoute="requestBloodHistory" />
        </TabNavigationItem>

        <TabNavigationItem
          id="donor"
          renderIcon={isSelected => this._renderIconSimpleLineIconsHead('drop', isSelected)}>
          <StackNavigation initialRoute="donor" />
        </TabNavigationItem>

        <TabNavigationItem
          id="friend"
          renderIcon={isSelected => this._renderIconSimpleLineIcons('globe', isSelected)}>
          <StackNavigation initialRoute="friend" />
        </TabNavigationItem>

        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIconSimpleLineIcons('notebook', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _renderIconMaterialCommunityIcons(name, isSelected) {
    return (
      <MaterialCommunityIcons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _renderIconIonicons(name, isSelected) {
    return (
      <Ionicons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _renderIconSimpleLineIcons(name, isSelected){
    return (
      <SimpleLineIcons
        name={name}
        size={20}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

    _renderIconSimpleLineIconsHead(name, isSelected){
    return (
      <SimpleLineIcons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
