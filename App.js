/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   View,
   Image,
 } from 'react-native';
 
//  import {NavigationContainer} from '@react-navigation/native';
//  import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
//  import HomeScreen from './src/pages/Home/HomeScreen';
//  import {DrawerNav} from './src/components/DrawerNav';
//  import MainTabScreen from './src/navigations/stackNavigation';
//  import Profile from './src/components/Profile';
//  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/pages/Home/HomeScreen';
import HomeStack from './src/navigations/Stack/HomeStack';
import DetailScreen from './src/pages/Detail/DetailScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TempStack from './src/navigations/Stack/tempStack';
import HomeDrawer from './src/navigations/Drawer/HomeDrawer';

 
//  const Drawer = createDrawerNavigator();
 
 const App =() => {
   return (
     <NavigationContainer>      
 
        {/* <TempStack/> */}

        <HomeDrawer/>

        {/* <HomeStack/> */}
     </NavigationContainer>
  
    
    
 
   );
 }
 
 
 
 export default App;
 