import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import {
  Image,
  Stylesheet

} from 'react-native';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Unnütze Fakten',
  tabBarIcon: <Image source={require('./Icon/Gif.png')} style={{ width: 30, height: 30 }} />,
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'GIFs',
  tabBarIcon: <Image source={require('./Icon/Gifi.png')} style={{ width: 30, height: 30 }} />,
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Chuck Norris Facts',
  tabBarIcon: <Image source={require('./Icon/chuck.png')} style={{ width: 32, height: 32 }} />,

};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});