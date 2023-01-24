import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {getProductById, getDetailById} from '../../services';
const StatusComponent = props => {
  const [numberofProduct, setNumberofProduct] = useState(0);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({
    imagepresent: 'http://127.0.0.1:8000/media/media/logo.jpg',
    price: 'Loading...',
    name: 'Loading...',
  });
  useEffect(() => {
    const GetInfor = () => {
      getDetailById(props.id).then(result => {
        setNumberofProduct(Object.keys(result).length);
        setData(result);
        result.forEach(element => {
          getProductById(element.product).then(re => {
            setProduct(re);
          });
        });
      });
    };
    GetInfor();
  }, []);
  async function ConfirmDelivery(id) {
    const apiAddAddress = 'http://10.0.2.2:8000/order/' + id + '/';
    try {
      var today = new Date();
      var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      let response = await fetch(apiAddAddress, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: 4,
          dateReceive: date,
        }),
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: 10,
      }}>
      <Text style={{margin: 10}}>#{props.id}</Text>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.Image}
            source={{
              uri: product.imagepresent.replace('127.0.0.1', '10.0.2.2'),
            }}
          />
          <View
            style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
            <Text style={{margin: 10}} ellipsizeMode="tail" numberOfLines={2}>
              {product.name}
            </Text>
            <View style={{margin: 10}}>
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
              {/* <Text style={{alignItems:"flex-end", color:"red", alignContent:"flex-end"}}>{product.price}</Text> */}
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
          }}>
          <Text>{numberofProduct} sản phẩm</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>Tổng thanh toán: </Text>
            <Text style={{color: 'red'}}>{props.total}</Text>
          </View>
        </View>
        <View style={styles.line1}></View>
      </View>

      <View style={{width: '100%', alignItems: 'flex-end'}}>
        {props.status == 1 ? (
          <View style={styles.Button}>
            <Text style={{color: '#000'}}>Đang xử lý</Text>
          </View>
        ) : null}
        {props.status == 2 ? (
          <View style={styles.Button}>
            <Text style={{color: '#000'}}>Đã xác nhận</Text>
          </View>
        ) : null}
        {props.status == 3 ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              ConfirmDelivery(props.id).then(re => {
                alert('Confirm Successfully');
              });
            }}>
            <Text style={{color: '#000'}}>Đã nhận được hàng</Text>
          </TouchableOpacity>
        ) : null}
        {props.status == 4 ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              props.navigation.navigate('Rating', {detail: data});
            }}>
            <Text style={{color: '#000'}}>Đánh giá</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Button: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: '#14A445',
    borderRadius: scale(3),
    margin: scale(10),
    width: '40%',
  },
  line1: {
    borderBottomWidth: 0.5,
    borderColor: 'black',
    marginTop: 15,
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#000',
  },
  Image: {
    width: scale(70),
    height: scale(70),
    margin: 10,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5F04',
  },
});
export default StatusComponent;
