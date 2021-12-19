/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
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

import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/pages/Home/HomeScreen';
import HomeStack from './src/navigations/Stack/HomeStack';
import DetailScreen from './src/pages/Detail/DetailScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TempStack from './src/navigations/Stack/tempStack';
import HomeDrawer from './src/navigations/Drawer/HomeDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/context/context';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/pages/Login/LoginScreen';
import RegisterScreen from './src/pages/Register/RegisterScreen';
//  const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const App = () => {
  initialLoginSate = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          email: action.id,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginSate,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        try {
          await AsyncStorage.setItem('userToken', password);
          await AsyncStorage.setItem('id', email);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: email, token: password});
      },
      signOut: async () => {
        //setuserToken(null);
        //setisLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('id');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        //setuserToken("asdasd");
        //setisLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      //setisLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken == null ? (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        ) : (
          <HomeDrawer />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
