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
import { getProductById } from '../../networking/Server';
const ProductComponent = props => {
  const [product, setData] = useState([
      {
          name: "loading",
          price:"loading",
          imagepresent:"http://127.0.0.1:8000/media/logo-uit.png"
      }
  ]);
  useEffect(() => {
    getProductById(props.id).then(re => {
        console.log(re);
      setData(re);
    });
  }, []);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
      }}>
      <Image
        style={styles.Image}
        source={{
          uri: product.imagepresent,
        }}
      />
      <View style={{flexDirection: 'column', marginTop: 5}}>
        <Text style={{marginTop: 10}} ellipsizeMode="tail" numberOfLines={2}>
          {product.name}
        </Text>
        <View style={{margin: 10, flexDirection: 'column'}}>
          <Text style={{color: 'red', marginLeft: 5}}>{product.price}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    Image: {
      width: scale(70),
      height: scale(70),
      margin: 10,
    },
  });
export default ProductComponent;
