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
import PaymentScreen from '../../pages/Cart/PaymentScreen';
import InstructionScreen from '../../pages/Instruction/InstructionScreen';

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
    <stack.Screen name="HomeDealSection" component={HomeDealSection} />
    <stack.Screen name="DetailHeader" component={DetailHeader} />
    <stack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{
        headerShown: false,
        //     title:'',

        //   headerBackTitleVisible: false,
        //   headerTitle: false,

        //   //dòng này bị lỗi
        //   // headerTransparent:false,
        //  // quá chán, thôi tự custom header
        //   headerTintColor: '#fff123',
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
     <stack.Screen name="Thanh Toán" component={PaymentScreen} />

     <stack.Screen name="InstructionScreen" component={InstructionScreen} />
  </stack.Navigator>
);

export default HomeStack;
