import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../pages/Login/LoginScreen';
import RegisterScreen from '../../pages/Register/RegisterScreen';
import ProfileScreen from '../../pages/Profile/ProfileScreen';
import SettingAccount from '../../pages/Profile/SettingAccount/SettingAccount';
import IngredientsScreen from '../../pages/Ingredients/IngredientScreen';
const stack  = createStackNavigator();
const TempStack = (navigation) => (
    <stack.Navigator initialRouteName="Ingredients" screenOptions={{headerShown:false}}>
        <stack.Screen name="Login" component={LoginScreen}/>
        <stack.Screen name = "Register" component={RegisterScreen}/>
        <stack.Screen name = "Profile" component={ProfileScreen}/>
        <stack.Screen name = "SettingAccount"component={SettingAccount}/>
        <stack.Screen name= "Ingredients"component={IngredientsScreen}/>
    </stack.Navigator>
);
export default TempStack;