import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../pages/Home/HomeScreen';
import DetailScreen from '../../pages/Detail/DetailScreen';
import DetailHeader from '../../components/Detail/DetailHeader';
import HomeDealSection from '../../components/Home/HomeDealSection';
import SearchScreen from '../../pages/Search/SearchScreen';
import SearchHeader from '../../components/Search/SearchHeader';
import CategoryScreen from '../../pages/Category/CategoryScreen';
import CategoryHeader from '../../components/Category/CategoryHeader';
import HomeCircleSection from '../../components/Home/HomeCircleSection';
import CartScreen from '../../pages/Cart/CartScreen';
import InstructionScreen from '../../pages/Instruction/InstructionScreen';
import DescriptionScreen from '../../pages/Description/DescriptionScreen';
import AddLocationScreen from '../../pages/Address/AddLocationScreen';
import ConfirmScreen from '../../pages/Cart/ConfirmScreen';
import AddressScreen from '../../pages/Address/AddressScreen';
import SettingAccount from '../../pages/Profile/SettingAccount/SettingAccount';
import OrderSuccessfullScreen from '../../pages/Cart/OrderSuccessfulScreen';
import DetailRating from '../../pages/Detail/Rating/DetailRating';
import DetailIngredients from '../../components/Ingredients/DetailIngredient/DetailIngredients';
import IngredientsScreen from '../../pages/Ingredients/IngredientScreen';
import DetailOrder from '../../pages/DetailOrder/DetailOrder';
import RatingScreen from '../../pages/Rating/RatingScreen';
import Pending from '../../pages/OrderStatus/Pending'
import Waiting from '../../pages/OrderStatus/Waiting';
import Delivery from '../../pages/OrderStatus/Delivery'
import Success from '../../pages/OrderStatus/Success'
const stack = createStackNavigator();
const HomeStack = ({navigation}) => (
  <stack.Navigator>
    
    <stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="Ingriedient"
      component={IngredientsScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen name="HomeDealSection" component={HomeDealSection} />
    <stack.Screen name="DetailHeader" component={DetailHeader} />
    <stack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{
        headerShown: false,
      }}
    />

    <stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen name="SearchHeader" component={SearchHeader} />
    <stack.Screen name="HomeCircleSection" component={HomeCircleSection} />

    <stack.Screen
      name="CategoryScreen"
      component={CategoryScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen name="CategoryHeader" component={CategoryHeader} />
    <stack.Screen
      name="CartScreen"
      component={CartScreen}
      options={{
        headerShown: false,
      }}
    />

    <stack.Screen
      name="AddLocationScreen"
      component={AddLocationScreen}
      options={{
        headerShown: false,
      }}
    />

    <stack.Screen
      name="ConfirmScreen"
      component={ConfirmScreen}
      options={{
        headerShown: false,
      }}
    />
    <stack.Screen
      name="AddressScreen"
      component={AddressScreen}
      options={{
        headerShown: false,
      }}
    />

    <stack.Screen name="InstructionScreen" component={InstructionScreen} />

    <stack.Screen
      name="DescriptionScreen"
      component={DescriptionScreen}
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
      name="OrderSuccessfullScreen"
      component={OrderSuccessfullScreen}
      // options={{
      //   headerShown: false,
      // }}
    />
    <stack.Screen
      name="RatingScreen"
      component={DetailRating}
      // options={{
      //   headerShown: false,
      // }}
    />
    <stack.Screen
      name="DetailIngredient"
      component={DetailIngredients}
      // options={{
      //   headerShown: false,
      // }}
    />
    <stack.Screen name= "Pending" component={Pending}/>
    <stack.Screen name="Delivery" component={Delivery}/>
    <stack.Screen name="Success" component={Success}/>
    <stack.Screen name= "Rating" component={RatingScreen}/>
    <stack.Screen name="DetailOrder" component={DetailOrder}/>
    <stack.Screen name="Waiting" component={Waiting}/>
  </stack.Navigator>
);

export default HomeStack;
