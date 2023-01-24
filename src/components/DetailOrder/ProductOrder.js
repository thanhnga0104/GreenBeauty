import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {getProductById} from '../../services';
const ProductOrder = props => {
  const [product, setProduct] = useState({
    imagepresent: 'http://127.0.0.1:8000/media/logo-uit.png',
    name: 'loading',
    price: 'loading',
  });
  const imagepresent = 'http://127.0.0.1:8000/media/logo-uit.png';
  useEffect(() => {
    const getData = () => {
      getProductById(props.id).then(result => {
        setProduct(result);
      });
    };
    getData();
  }, []);
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.Image}
          source={{uri: product.imagepresent.replace('127.0.0.1', '10.0.2.2')}}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={{margin: 10}} ellipsizeMode="tail" numberOfLines={2}>
            {product.name}
          </Text>
          <View style={{marginLeft: 10, flexDirection: 'column'}}>
            <Text style={{marginLeft: 5, color: '#FF5F04'}}>
              x{props.quanlity}
            </Text>
            {product.IsFlashsale == true ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.itemPrice}>
                  {product.price - (product.price * product.priceSale) / 100}đ
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FF5F04',
                      borderRadius: 3,
                      justifyContent: 'center',
                      marginTop: 6,
                    }}></TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text style={styles.itemPrice}>{product.price}đ</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  Image: {
    width: scale(70),
    height: scale(70),
    margin: 10,
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#000',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5F04',
  },
});
export default ProductOrder;
