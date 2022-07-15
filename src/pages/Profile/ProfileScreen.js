import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-paper';
import {AuthContext} from '../../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [data, setData] = useState({
    name: 'Loading...',
    id: '',
    avt: 'http://127.0.0.1:8000/media/logo-uit.png',
    phonenum: 'loading...',
    token: '',
  });
  const [Pending, setPending] = useState(0);
  const [Wait, setWait] = useState(0);
  const [Delivery, setDelivery] = useState(0);
  const [Success, setSuccess] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const valueid = await AsyncStorage.getItem('id');
      setId(valueid);

      getInfo(valueid, value);
      getStatus(valueid, 1);

      getStatus(valueid, 2);

      getStatus(valueid, 3);

      getStatus(valueid, 4);
      if (value !== null) {
      }
    } catch (e) {
      alert('no data');
    }
  };
  const getInfo = async (id, token) => {
    console.log('token: ', 'Bearer ' + token);
    await fetch('http://10.0.2.2:8000/user/' + id + '/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(d => {
            console.log('name: ', Object.keys(d.name).length);
            setData({
              ...data,
              name: d.name,
              phonenum: d.phone,
              avt: d.avt,
            });
          });
        }
      })
      .then(res => {})
      .catch(error => {
        console.error('eroor', error);
        return {name: 'network error', description: ''};
      });
  };
  const getStatus = async (id, sta) => {
    await fetch('http://10.0.2.2:8000/order/?user=' + id + '&status=' + sta, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(d => {
            if (sta == 1) setPending(Object.keys(d).length);
            else if (sta == 2) setWait(Object.keys(d).length);
            else if (sta == 3) setDelivery(Object.keys(d).length);
            else {
              setSuccess(Object.keys(d).length);
            }
          });
        }
      })
      .then(res => {})
      .catch(error => {
        console.error('eroor', error);
        return {name: 'network error', description: ''};
      });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: '#EEEEEE'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.headerContainer}>
          <View style={styles.menuContainer}>
            <Feather
              name="menu"
              size={28}
              color="#fff"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          </View>
          <View
            style={{
              paddingRight: 20,
            }}>
            <Feather
              name="settings"
              color="#FFF"
              size={scale(24)}
              onPress={() => {
                navigation.navigate('SettingAccount');
              }}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View
            style={{
              marginLeft: scale(widthofscreen / 15),
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Avatar.Image
                style={{backgroundColor: '#FFF'}}
                size={scale(widthofscreen / 6.5)}
                source={{uri: data.avt.replace('127.0.0.1', '10.0.2.2')}}
              />
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: scale(10),
              }}>
              <Text
                style={{
                  fontSize: scale(20),
                  fontWeight: 'bold',
                  color: '#FFF',
                }}>
                {data.name}
              </Text>
              <Text
                style={{fontSize: scale(15), fontWeight: '600', color: '#FFF'}}>
                {data.phonenum}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.purchased}>
          <TouchableOpacity
            style={{alignItems: 'flex-end', justifyContent: 'center'}}
            onPress={() => {
              navigation.navigate('Pending');
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <MaterialIcons
                name="receipt-long"
                size={scale(35)}
                color="#B2A7AA"
              />
              <Text
                style={{
                  marginTop: scale(2),
                  fontSize: scale(7),
                  fontWeight: 'bold',
                }}>
                Chờ xác nhận
              </Text>
            </View>
            {Pending > 0 ? (
              <View style={styles.circle}>
                <Text
                  style={{
                    fontSize: scale(7),
                    fontWeight: 'bold',
                    color: '#FFF',
                  }}>
                  {Pending}
                </Text>
              </View>
            ) : (
              <View>
                <Text> </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'flex-end', justifyContent: 'center'}}
            onPress={() => {
              navigation.navigate('Waiting');
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <MaterialIcons
                name="storefront"
                size={scale(35)}
                color="#B2A7AA"
              />
              <Text
                style={{
                  marginTop: scale(2),
                  fontSize: scale(7),
                  fontWeight: 'bold',
                }}>
                Chờ lấy hàng
              </Text>
            </View>
            {Wait > 0 ? (
              <View style={styles.circle}>
                <Text
                  style={{
                    fontSize: scale(7),
                    fontWeight: 'bold',
                    color: '#FFF',
                  }}>
                  {Wait}
                </Text>
              </View>
            ) : (
              <View>
                <Text> </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'flex-end', justifyContent: 'center'}}
            onPress={() => {
              navigation.navigate('Delivery');
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <MaterialCommunityIcons
                name="truck-outline"
                size={scale(35)}
                color="#B2A7AA"
              />
              <Text
                style={{
                  marginTop: scale(2),
                  fontSize: scale(7),
                  fontWeight: 'bold',
                }}>
                Đang giao
              </Text>
            </View>
            {Delivery > 0 ? (
              <View style={styles.circle}>
                <Text
                  style={{
                    fontSize: scale(7),
                    fontWeight: 'bold',
                    color: '#FFF',
                  }}>
                  {Delivery}
                </Text>
              </View>
            ) : (
              <View>
                <Text> </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'flex-end', justifyContent: 'center'}}
            onPress={() => {
              navigation.navigate('Success');
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <MaterialIcons
                name="star-outline"
                size={scale(35)}
                color="#B2A7AA"
              />
              <Text
                style={{
                  marginTop: scale(2),
                  fontSize: scale(7),
                  fontWeight: 'bold',
                }}>
                Đánh giá
              </Text>
            </View>
            {Success > 0 ? (
              <View style={styles.circle}>
                <Text
                  style={{
                    fontSize: scale(7),
                    fontWeight: 'bold',
                    color: '#FFF',
                  }}>
                  {Success}
                </Text>
              </View>
            ) : (
              <View>
                <Text> </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.setting}>
          <TouchableOpacity
            style={styles.itemsetting}
            onPress={() => {
              navigation.navigate('LoveListScreen');
            }}>
            <Icon
              name="heart-o"
              size={scale(24)}
              style={{marginLeft: scale(10)}}
              color="#FC7676"
            />
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '300',
                marginLeft: scale(10),
              }}>
              Đã thích
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemsetting}
            onPress={() => {
              navigation.navigate('RatingHistory', {user: id});
            }}>
            <MaterialIcons
              name="star-outline"
              size={scale(24)}
              style={{marginLeft: scale(10)}}
              color="#F2F479"
            />
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '300',
                marginLeft: scale(10),
              }}>
              Đánh giá sản phẩm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemsetting}
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={scale(24)}
              style={{marginLeft: scale(10)}}
              color="#FFAC7D"
            />
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '300',
                marginLeft: scale(10),
              }}>
              Giỏ hàng
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemsetting1}>
            <MaterialCommunityIcons
              name="gift-outline"
              size={scale(24)}
              style={{marginLeft: scale(10)}}
              color="#69E16E"
            />
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '300',
                marginLeft: scale(10),
              }}>
              Kho quà tặng
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.setting}>
          <TouchableOpacity
            style={styles.itemsetting}
            onPress={() => {
              navigation.navigate('SettingAccount');
            }}>
            <Feather
              style={{marginLeft: scale(10)}}
              name="settings"
              color="#231F20"
              size={scale(24)}
            />

            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '300',
                marginLeft: scale(10),
              }}>
              Cài đặt tài khoản
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemsetting}>
            <Feather
              name="message-square"
              size={scale(24)}
              style={{marginLeft: scale(10)}}
              color="#FFAC7D"
            />
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '300',
                marginLeft: scale(10),
              }}>
              Trò chuyện với GreenBeauty
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemsetting1}>
            <Feather
              name="phone-call"
              size={scale(24)}
              style={{marginLeft: scale(10)}}
              color="#69E16E"
            />
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '300',
                marginLeft: scale(10),
              }}>
              Gọi cho chúng tôi
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.setting, {marginBottom: 10}]}>
          <TouchableOpacity
            style={styles.itemsetting}
            onPress={() => {
              signOut();
            }}>
            <MaterialIcons
              name="logout"
              size={scale(24)}
              style={{marginLeft: scale(10)}}
              color="#231F20"
            />
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '300',
                marginLeft: scale(10),
              }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const heightofscreen = Dimensions.get('window').height;
const widthofscreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: widthofscreen,
    height: scale(heightofscreen / 6),
    backgroundColor: '#316C49',
    borderBottomLeftRadius: scale(30),
    borderBottomRightRadius: scale(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avt: {
    height: scale(widthofscreen / 5),
    width: scale(widthofscreen / 5),
    borderRadius: scale(widthofscreen / 5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  purchased: {
    height: heightofscreen / 7,
    borderRadius: scale(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 16,
    marginTop: scale(30),
    marginRight: scale(10),
    marginLeft: scale(10),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  setting: {
    borderRadius: scale(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 16,
    marginTop: scale(30),
    marginRight: scale(10),
    marginLeft: scale(10),
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  itemsetting: {
    flexDirection: 'row',
    marginTop: scale(10),
    borderBottomWidth: 0.2,
    paddingBottom: scale(10),
  },
  itemsetting1: {
    flexDirection: 'row',
    marginVertical: scale(10),
    marginTop: scale(10),
  },
  circle: {
    height: scale(15),
    width: scale(15),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#F28244',
    alignItems: 'center',
    bottom: scale(40),
  },

  //   của header
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#316C49',
    justifyContent: 'space-between',
  },
  inputContainer: {
    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    flex: 1,
    height: 35,
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 4,
    borderWidth: 0.3,
    borderEndColor: '#7D7D7D',
  },

  menuContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
});
export default ProfileScreen;
