import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../pages/Profile/ProfileScreen';
import SettingAccount from '../../pages/Profile/SettingAccount/SettingAccount';
import CartScreen from '../../pages/Cart/CartScreen';
import Pending from '../../pages/OrderStatus/Pending';
import Waiting from '../../pages/OrderStatus/Waiting';
import Delivery from '../../pages/OrderStatus/Delivery';
import Success from '../../pages/OrderStatus/Success';
import LoveListScreen from '../../pages/LoveList/LoveListScreen';
import RatingHistory from '../../pages/Profile/RatingHistory/RatingHistory';
import DetailScreen from '../../pages/Detail/DetailScreen';
import DetailOrder from '../../pages/DetailOrder/DetailOrder'
import RatingScreen from '../../pages/Rating/RatingScreen';
const stack = createStackNavigator();
const ProfileStack = ({navigation}) => (
  <stack.Navigator>
    <stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="SettingAccount"
      component={SettingAccount}
      options={{
        headerShown: false,
      }}
    />

    <stack.Screen
      name="Pending"
      component={Pending}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="Delivery"
      component={Delivery}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="Success"
      component={Success}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="Waiting"
      component={Waiting}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="LoveListScreen"
      component={LoveListScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen name="RatingHistory" component={RatingHistory} 
    options={{
      headerShown: false,
    }}/>
    {/* <stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{
        headerShown: false,
      }}/> */}
      <stack.Screen name="DetailOrder" component={DetailOrder} 
      options={{
        headerShown: false,
      }}/>
    <stack.Screen name="Rating" component={RatingScreen} 
    options={{
        headerShown: false,
      }}/>
  </stack.Navigator>
);

export default ProfileStack;
