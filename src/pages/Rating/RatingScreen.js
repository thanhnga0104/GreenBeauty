import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    ImageBackground,
    Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Item,
  Label,
  TextInput,
  Touchable,
  TouchableOpacityBase,
  TouchableOpacity,
  Button,
  FlatList,
  VirtualizedList
} from 'react-native';
import {scale} from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Rating from '../../components/RatingProduct/Rating';
const RatingScreen = ({navigation,route}) =>{
    const ItemSepatator = () => (
        <View
          style={{
            borderBottomWidth: 0.6,
            borderColor: '#E5E5E5',
          }}
        />
      );
    return(
        <FlatList
        data={route.params.detail}
        ItemSeparatorComponent = {ItemSepatator}
        renderItem={({item})=>{
        return(
            !item.isRating?
                <Rating order = {item.id} id={item.product}/>
            :
            null
        )
        }}
        keyExtractor={(item) => item.id}
        />
    )
}
export default RatingScreen;