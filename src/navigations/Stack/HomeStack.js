import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../pages/Home/HomeScreen';
import DetailScreen from '../../pages/Detail/DetailScreen';
import DetailHeader from '../../components/Detail/DetailHeader';
import HomeProductSection from '../../components/Home/HomeProductSection';
import SearchScreen from '../../pages/Search/SearchScreen';
import SearchHeader from '../../components/Search/SearchHeader';


const stack  = createStackNavigator();
const HomeStack = (navigation) => (
  <stack.Navigator>
    <stack.Screen name="HomeScreen" component={HomeScreen} options={{
        headerShown:false,}} />
    <stack.Screen name="HomeProductSection" component={HomeProductSection}/>
    <stack.Screen name="DetailHeader" component={DetailHeader}/>
    <stack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{
        headerShown:false,
      //     title:'', 
           
      //   headerBackTitleVisible: false,
      //   headerTitle: false,
        
      //   //dòng này bị lỗi
      //   // headerTransparent:false,
      //  // quá chán, thôi tự custom header
      //   headerTintColor: '#fff123',
      }}
    />

    <stack.Screen name="SearchScreen" component={SearchScreen} options={{
        headerShown:false,}}/>
    <stack.Screen name="SearchHeader" component={SearchHeader}/>
    
  </stack.Navigator>
);

export default HomeStack;
