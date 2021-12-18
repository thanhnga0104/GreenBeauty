import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CategoryScreen from '../../pages/Category/CategoryScreen';
import CategoryHeader from '../../components/Category/CategoryHeader';
import RecommendProductScreen from '../../pages/Category/RecommendProductScreen';
const stack = createStackNavigator();
const CategoryStack = ({navigation}) => (
  <stack.Navigator>
    <stack.Screen
      name="CategoryScreen"
      component={CategoryScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen name="CategoryHeader" component={CategoryHeader} />
    <stack.Screen
      name="RecommendProductScreen"
      component={RecommendProductScreen}
      options={{
        headerShown: false,
      }}
    />
  </stack.Navigator>
);

export default CategoryStack;
