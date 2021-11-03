import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import HomeScreen from '../../pages/Home/HomeScreen';
import ProfileScreen from '../../pages/Profile/ProfileScreen';
import CategoryScreen from '../../pages/Category/CategoryScreen';
import HomeStack from '../Stack/HomeStack';
import MainTab from '../Tab/MainTab';
const drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    // <drawer.Navigator DrawerContent={props => <DrawerContent{...props}/>}>
    <drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <drawer.Screen
        name="Home"
        component={HomeStack}
        // component={MainTab}
        options={{headerShown: false}}
      />
      <drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <drawer.Screen
        name="Category"
        component={CategoryScreen}
        options={{headerShown: false}}
      />
    </drawer.Navigator>
  );
};

export default HomeDrawer;
