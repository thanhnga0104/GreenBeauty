import React, {useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeDrawer from './src/navigations/Drawer/HomeDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/context/context';
import {ActivityIndicator} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/pages/Login/Login';
import Register from './src/pages/Register/Register';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
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
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('id');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {},
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
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
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken == null ? (
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          ) : (
            <HomeDrawer />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
