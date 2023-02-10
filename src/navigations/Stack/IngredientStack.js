import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IngredientsScreen from '../../pages/Ingredients/IngredientScreen';
import IngredientComponent from '../../components/Ingredients/ingredients';
import DetailIngredients from '../../components/Ingredients/DetailIngredient/DetailIngredients';

const stack = createStackNavigator();
const IngredientStack = ({navigation}) => (
  <stack.Navigator>
    <stack.Screen
      name="IngredientsScreen"
      component={IngredientsScreen}
      options={{
        headerShown: false,
      }}
    />

    <stack.Screen
      name="IngredientComponent"
      component={IngredientComponent}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="DetailIngredient"
      component={DetailIngredients}
      options={{
        headerShown: false,
      }}
    />
  </stack.Navigator>
);

export default IngredientStack;
