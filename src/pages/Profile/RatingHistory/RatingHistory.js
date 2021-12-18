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
  VirtualizedList,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RatingComponent from '../../../components/Rating/RatingComponent';
import {getRatingbyUserid} from '../../../networking/Server';
import ProductComponent from '../../../components/Profile/ProductComponent';
const RatingHistory = ({navigation, route}) => {
  const ItemSepatator = () => (
    <View
      style={{
        borderBottomWidth: 0.6,
        borderColor: '#E5E5E5',
      }}
    />
  );
  const [data, setData] = useState([]);
  useEffect(() => {
      console.log(route.params.user);
    getRatingbyUserid(route.params.user).then(re => {
        console.log("data", re);
      setData(re);
    });
  }, []);
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={ItemSepatator}
      renderItem={({item}) => {
        return (
          <View>
            <ProductComponent id ={item.product}/>
            <RatingComponent
              id={route.params.id}
              point={item.ratingpoint}
              comment={item.ratingcomment}
              img={"http://127.0.0.1:8000"+item.img}
            />
          </View>
        );
      }}
      keyExtractor={item => item.id}
    />
  );
};
export default RatingHistory;
