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


 
//  const Drawer = createDrawerNavigator();
 
 const App =() => {
   return (
     <NavigationContainer>
       {/* <Drawer.Navigator drawerContent={props => <DrawerNav {...props}/>}>
         <Drawer.Screen name="HomeDrawer" component={MainTabScreen}
         options={{headerShown: false}}
         />
         {/* <Drawer.Screen name="Profile" component={Profile}/> */}
       {/* </Drawer.Navigator> */} 
 
       <HomeStack/>
     </NavigationContainer>
  //  <HomeScreen/>
    // <DetailScreen/>
    
    
 
   );
 }
 
 
 
 export default App;
 