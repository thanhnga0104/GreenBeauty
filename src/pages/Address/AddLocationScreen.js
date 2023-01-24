import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Switch,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WardComponent from './WardComponent';
import DistrictComponent from './DistrictComponent';
import CityComponent from './CityComponent';
import {getDataUser} from '../../services';
import {postAddress} from '../../services';
import {putAddress} from '../../services';
import {getAddress} from '../../services';

export default class AddLocationScreen extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      name: null,
      phone: null,
      city: [],
      district: [],
      ward: [],
      address: null,
      isEnable: true,
      isFirst: false, // isFirst = false tức là đây ko phải địa chỉ đầu tiên, bắt buộc của khách hàng
    };
  }
  componentDidMount() {
    this.fetchDataUser();
    this.setFirst();
  }

  fetchDataUser = () => {
    getDataUser()
      .then(user => {
        this.setState({userData: user});
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  setFirst = () => {
    if (this.props.route.params.isFirst == 'true') {
      this.setState({isFirst: true});
    }
  };

  setName = text => {
    this.setState({name: text});
  };
  setPhone = num => {
    this.setState({phone: num});
  };
  setProvince = city => {
    this.setState({city: city});
  };
  setDistrict = district => {
    this.setState({district: district});
  };
  setWard = ward => {
    this.setState({ward: ward});
  };
  setAddress = text => {
    this.setState({address: text});
  };

  pressButton(navigation) {
    if (
      Object.keys(this.state.city.name) != 0 &&
      Object.keys(this.state.district.name) != 0 &&
      Object.keys(this.state.ward.name) != 0 &&
      this.state.name != null &&
      this.state.phone != null &&
      this.state.address != null
    ) {
      let fullAddress =
        this.state.address +
        ', ' +
        this.state.ward.name +
        ', ' +
        this.state.district.name +
        ', ' +
        this.state.city.name;
      let defaultAddress = 0;
      if (this.state.isEnable == true) {
        defaultAddress = 1;
        getAddress(this.state.userData, 1).then(address => {
          address.forEach(_address => {
            putAddress(this.state.userData, _address.id).then(
              () => 'Set previous default dress = 0',
            );
          });
        });
      }
      postAddress(
        this.state.userData,
        this.state.name,
        this.state.phone,
        this.state.address,
        fullAddress,
        defaultAddress,
      )
        .then(item => {})
        .catch(error => {
          console.error(`Error is: ${error}`);
        });
      if (this.state.isFirst == true) {
        navigation.navigate('ConfirmScreen', {
          selectData: this.props.route.params.selectData,
        });
      } else {
        navigation.goBack();
      }
    } else {
      alert('Hãy nhập đủ thông tin địa chỉ nhận hàng.');
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, height: '100%'}}>
        <StatusBar backgroundColor="#316C49" barStyle="light-content" />
        <View style={{height: '100%', backgroundColor: '#fff'}}>
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
              <Text style={styles.titleHeader}>Thêm địa chỉ mới</Text>
            </View>
          </View>

          <View style={{backgroundColor: '#fff', padding: 10}}>
            <View>
              <TextInput
                placeholder="Tên người nhận"
                onChangeText={text => {
                  this.setName(text);
                }}></TextInput>
              <View
                style={{
                  borderBottomWidth: 0.3,
                  borderColor: 'black',
                }}
              />

              <TextInput
                placeholder="Số điện thoại"
                onChangeText={text => {
                  this.setPhone(text);
                }}
                keyboardType="numeric"></TextInput>
              <View
                style={{
                  borderBottomWidth: 0.3,
                  borderColor: 'black',
                }}
              />
              <View>
                <CityComponent
                  navigation={navigation}
                  name={'Tỉnh/Thành phố*'}
                  city={this.setProvince}
                  district={this.setDistrict}
                  ward={this.setWard}
                />
              </View>
              <View>
                <DistrictComponent
                  navigation={navigation}
                  name={'Quận/Huyện'}
                  city={this.state.city}
                  district={this.setDistrict}
                  ward={this.setWard}
                />
              </View>
              <View>
                <WardComponent
                  navigation={navigation}
                  name={'Phường/Xã'}
                  city={this.state.city}
                  district={this.state.district}
                  ward={this.setWard}
                />
              </View>
              <View>
                <TextInput
                  placeholder="Số nhà + Tên đường"
                  onChangeText={text => {
                    this.setAddress(text);
                  }}></TextInput>
                <View
                  style={{
                    borderBottomWidth: 0.3,
                    borderColor: 'black',
                  }}
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 15}}>Đặt làm địa chỉ mặc định</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={this.state.isEnable ? '#316C49' : '#f4f3f4'}
                  onValueChange={tempValue => {
                    this.setState({isEnable: tempValue});
                    console.log('tempValue:', tempValue);
                  }}
                  value={this.state.isEnable}
                />
              </View>
            </View>
          </View>

          <View style={styles.addAddressContainer}>
            <TouchableOpacity
              style={styles.addAddressButton}
              onPress={() => this.pressButton(navigation)}>
              <Text style={styles.addAddressText}>Thêm mới</Text>
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

  titleHeader: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  addAddressContainer: {
    borderTopColor: '#E5E5E5',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addAddressButton: {
    paddingHorizontal: width / 4,
    backgroundColor: '#316C49',
    height: height / 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addAddressText: {
    fontSize: 22,
    color: '#fff',
  },
});
