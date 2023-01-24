import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductOrder from '../../components/DetailOrder/ProductOrder';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDetailById, getDeliveryInformation} from '../../services';
import Modal from 'react-native-modal';

const DetailOrder = ({navigation, route}) => {
  const [delivery, setDelivery] = useState({
    receiveName: 'loading',
    phone: 'loading',
    fullAddress: 'Loading',
  });
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getData = () => {
      getDeliveryInformation(route.params.order.delivery).then(result => {
        setDelivery(result);
      });
      getDetailById(route.params.order.id).then(result => {
        setProduct(result);
      });
    };
    getData();
  }, []);
  const [Reason, setReason] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const textInputModalChange = val => {
    setReason(val);
    console.log('email :', Reason);
  };
  async function CancelOrder(id, reason) {
    const apiAddAddress = 'http://10.0.2.2:8000/order/' + id + '/';
    try {
      let response = await fetch(apiAddAddress, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: 5,
          cancellationReason: reason,
        }),
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
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
    <View>
      <ScrollView>
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
            <Text style={styles.titleScreen}>Chờ xử lý</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
            <MaterialCommunityIcons
              name="truck-fast-outline"
              size={scale(15)}
            />
            <Text style={{fontWeight: '700', marginLeft: 5}}>
              Thông tin vận chuyển
            </Text>
          </View>
          <Text style={{marginTop: 10, marginLeft: 5, marginBottom: 5}}>
            COD Nhanh
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
            <Ionicons name="md-location-outline" size={scale(15)} />
            <Text style={{fontWeight: '700', marginLeft: 5}}>
              Địa chỉ nhận hàng
            </Text>
          </View>
          <View style={{marginTop: 10, marginLeft: 20, marginBottom: 5}}>
            <Text>{delivery.receiveName}</Text>
            <Text>{delivery.phone}</Text>
            <Text>{delivery.fullAddress}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          {product.map(item => {
            return (
              <ProductOrder
                key={item.id}
                quanlity={item.quantities}
                id={item.product}
              />
            );
          })}
          <View
            style={{
              marginTop: 5,
              marginLeft: 5,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', marginLeft: 5}}>Thành tiền</Text>
            <Text style={{marginRight: 5}}>
              đ{route.params.order.totalValue}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
            <MaterialIcons
              name="attach-money"
              size={scale(15)}
              color="#F28244"
            />
            <Text style={{fontWeight: '700', marginLeft: 5}}>
              Phương thức thanh toán
            </Text>
          </View>
          <Text style={{marginTop: 10, marginLeft: 10, marginBottom: 5}}>
            Thanh toán khi nhận hàng
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginLeft: 5,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '700', marginLeft: 5}}>Mã đơn hàng</Text>
            <Text style={{marginRight: 5}}>#{route.params.order.id}</Text>
          </View>

          <View
            style={
              route.params.order.status == 4
                ? {
                    flexDirection: 'row',
                    marginTop: 5,
                    marginLeft: 5,
                    justifyContent: 'space-between',
                  }
                : {
                    flexDirection: 'row',
                    marginTop: 5,
                    marginLeft: 5,
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }
            }>
            <Text style={{marginLeft: 5}}>Thời gian đặt</Text>
            <Text style={{marginRight: 5}}>
              {route.params.order.dateCreate}
            </Text>
          </View>

          {route.params.order.status == 4 ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginLeft: 5,
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <Text style={{marginLeft: 5}}>Thời gian nhận hàng</Text>
              <Text style={{marginRight: 5}}>
                {route.params.order.dateReceive}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{alignItems: 'center'}}>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modal}>
              <View style={styles.headermodal}>
                <Text style={{color: '#FFF'}}>Cancel Order</Text>
              </View>
              <View style={{borderBottomWidth: 0.5, borderColor: '#000'}}>
                <TextInput
                  style={styles.inputmodal}
                  placeholder="Type your reason here"
                  onChangeText={val => textInputModalChange(val)}></TextInput>
              </View>
              <View style={{width: '80%', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() =>
                    CancelOrder(route.params.order.id, Reason).then(re => {
                      alert('Hủy đơn thành công');
                    })
                  }>
                  <Text>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => toggleModal()}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View style={{width: '100%', alignItems: 'center'}}>
        {route.params.order.status == 1 ? (
          <TouchableOpacity style={styles.Button} onPress={() => toggleModal()}>
            <Text>Hủy đơn hàng</Text>
          </TouchableOpacity>
        ) : null}
        {route.params.order.status == 2 ? (
          <View style={styles.Button}>
            <Text>Đang vận chuyển</Text>
          </View>
        ) : null}
        {route.params.order.status == 3 ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              ConfirmDelivery(route.params.order.id).then(re => {
                alert('Confirm Successfully');
              });
            }}>
            <Text>Đã nhận được hàng</Text>
          </TouchableOpacity>
        ) : null}
        {route.params.order.status == 4 ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              navigation.navigate('Rating', {detail: product});
            }}>
            <Text>Đánh giá</Text>
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
    backgroundColor: '#FFF',
    borderRadius: scale(3),
    margin: scale(10),
    borderColor: '#14A445',
    borderWidth: 1,
    width: '40%',
  },
  modal: {
    width: '100%',
    height: scale(250),
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headermodal: {
    height: scale(50),
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  inputmodal: {
    color: '#B6C7D1',
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#000',
  },
  buttonModal: {
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: '#14A445',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    marginBottom: scale(10),
  },
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

  titleScreen: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
});
export default DetailOrder;
