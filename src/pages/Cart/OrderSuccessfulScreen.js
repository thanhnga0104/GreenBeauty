import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class OrderSuccessfullScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <SuccessfullComponent navigation={navigation} />
        <View
          style={{
            backgroundColor: '#316C49',
            padding: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AntDesign
              style={{paddingHorizontal: 10}}
              name="exclamationcircle"
              size={24}
              color="#fff"
            />
            <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
              Đặt hàng thành công
            </Text>
          </View>
          <View
            style={{alignItems: 'center', marginTop: 10, marginHorizontal: 30}}>
            <Text
              style={{
                color: '#fff',
                alignContent: 'center',
                textAlign: 'center',
              }}>
              Chỉ nhận hàng và thanh toán khi đơn mua ở trạng thái "Đang giao
              hàng"
            </Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderColor: '#fff',
              height: 40,
              width: 150,
              borderWidth: 1,
              justifyContent: 'center',
              borderRadius: 4,
              marginTop: 20,
            }}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
            <Text style={{fontSize: 18, fontWeight: '400', color: '#fff'}}>
              Trang chủ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class SuccessfullComponent extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color={'#fff'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <View style={styles.cartContainer}>
          <AntDesign
            name="shoppingcart"
            size={24}
            color={'#fff'}
            onPress={() => {
              navigation.navigate('CartScreen');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#316C49',
    justifyContent: 'space-between',
  },
  backContainer: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  circle: {
    height: scale(14),
    width: scale(14),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#F28244',
    alignItems: 'center',
    bottom: scale(26),
    left: scale(8),
  },
});
