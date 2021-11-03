import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeStack from "../Stack/HomeStack";
import ProfileScreen from "../../pages/Profile/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();


const MainTab = () => (
    <Tab.Navigator
    initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        // component={HomeStackScreen}
        component={HomeStack}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarColor: '#009387',
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="ios-home" color={color} size={26} />
        //   ),
        }}
      />
      
      
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarColor: '#694fad',
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="ios-person" color={color} size={26} />
        //   ),
        }}
      />
      
    </Tab.Navigator>
);

export default MainTab;
