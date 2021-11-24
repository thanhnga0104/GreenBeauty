import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class PaymentScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#316C49" barStyle="light-content" />
        <View style={styles.headerContainer}>
          <View style={styles.backContainer}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>

          <View>
            <Text
              style={{
                flex: 1,
                color: '#fff',
                marginLeft: 8,
                fontSize: 16,
                fontWeight: '600',
                textAlignVertical: 'center',
              }}>
              Xác nhận
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <View style={styles.childContainer}>
            <Text style={styles.titleComponent}>Địa chỉ nhận hàng</Text>

            <View style={{flexDirection: 'row'}}>
              <View style={{width: width / 1.1}}>
                <Text>Nhà riêng, cơ quan</Text>
                <Text>Họ tên người nhận</Text>
                <Text>Số điện thoại</Text>
                <Text>Địa chỉ dài thòn</Text>
              </View>

              <View style={styles.rightContainer}>
                <EvilIcons name="chevron-right" size={30} color="black" />
              </View>
            </View>
          </View>

          <View style={styles.spaceContainer}></View>
          <View style={styles.childContainer}>
            <Text style={styles.titleComponent}>Phương thức thanh toán</Text>
            <Text>Ở đây hiển thị phương thức thanh toán</Text>
          </View>
          <View style={styles.spaceContainer}></View>
          <View style={styles.childContainer}>
            <Text style={styles.titleComponent}>Thông tin đơn hàng</Text>
            {/* <FlatList>

                   </FlatList> */}
          </View>
          <View style={styles.spaceContainer}></View>
          <View>
            <TextInput placeholder="Nhập ghi chú (Nếu có)"></TextInput>
          </View>
          <View style={styles.childContainer}>
            <Text>Tạm tính</Text>
            <Text>Giảm giá</Text>
            <Text>Phí vận chuyển</Text>
            <Text>Thành tiền</Text>
          </View>

          <View style={styles.addCartContainer}>
            <TouchableOpacity style={styles.addCartButton}>
              <Text style={styles.addCartText}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#316C49',
  },

  backContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childContainer: {
    margin: 10,
  },
  spaceContainer: {
    padding: 3,

    backgroundColor: '#E5E5E5',
  },
  titleComponent: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCartContainer: {
    borderTopWidth: 0.6,
    borderTopColor: '#E5E5E5',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },

  addCartButton: {
    paddingHorizontal: width / 4,
    backgroundColor: 'green',
    height: height / 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addCartText: {
    fontSize: 22,
    color: '#fff',
  },
});
