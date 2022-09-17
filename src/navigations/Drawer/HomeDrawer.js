import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import HomeStack from '../Stack/HomeStack';
import ProfileStack from '../Stack/ProfileStack';
import CategoryStack from '../Stack/CategoryStack';
import IngredientStack from '../Stack/IngredientStack';
const drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <drawer.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{headerShown: false}}
      />
      <drawer.Screen
        name="Category"
        component={CategoryStack}
        options={{headerShown: false}}
      />

      <drawer.Screen
        name="Ingredients"
        component={IngredientStack}
        options={{headerShown: false}}
      />
    </drawer.Navigator>
  );
};

export default HomeDrawer;
