import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {getProductById} from '../../services';
const ProductComponent = props => {
  const [product, setData] = useState([
    {
      name: 'loading',
      price: 'loading',
      imagepresent: 'http://127.0.0.1:8000/media/logo-uit.png',
    },
  ]);
  useEffect(() => {
    getProductById(props.id).then(re => {
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
