import React, {Component} from 'react';

import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WardComponent from './WardComponent';
import DistrictComponent from './DistrictComponent';
import CityComponent from './CityComponent';

export default class AddLocationScreen extends Component {
  constructor() {
    super();
    this.state = {
      city: [],
      district: [],
      ward: [],
    };
  }
  // componentDidMount() {
  //   this.refreshProvinceFromServer();
  // }
  // refreshProvinceFromServer = () => {
  //   getProvince()
  //     .then(provinces => {
  //       this.setState({provinceData: provinces});
  //     })
  //     .catch(error => {
  //       this.setState({provinceData: []});
  //     });
  // };

  // handleSelect(text) {
  //   if (text) {
  //     const newData = this.state.provinceData.filter(item => {
  //       const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });

  //     this.setState({filterProvince: newData});
  //   } else if (text == '') {
  //     this.setState({filterProvince: this.state.provinceData});
  //   }
  // }

  setProvince = city => {
    this.setState({city: city});
  };
  setDistrict = district => {
    this.setState({district: district});
  };
  setWard = ward => {
    this.setState({ward: ward});
  };

  pressButton(navigation){

    //Kiểm tra dữ liệu trước khi thêm mới
    navigation.navigate("ConfirmScreen");    
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, height: '100%'}}>
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
            <Text style={styles.titleHeader}>Thêm địa chỉ mới</Text>
          </View>
        </View>

        <View style={{backgroundColor: '#fff', padding: 10}}>
          <View>
            <TextInput
              placeholder="Tên người nhận"
              // underlineColorAndroid="#E5E5E5"
            ></TextInput>
            <View
              style={{
                borderBottomWidth: 0.3,
                borderColor: 'black',
              }}
            />

            <TextInput
              placeholder="Số điện thoại"
              // underlineColorAndroid="#E5E5E5"
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
              <TextInput placeholder="Số nhà + Tên đường"></TextInput>
              <View
                style={{
                  borderBottomWidth: 0.3,
                  borderColor: 'black',
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.addAddressContainer}>
          <TouchableOpacity style={styles.addAddressButton}
          onPress={()=>this.pressButton(navigation)}>
            <Text style={styles.addAddressText}>Thêm mới</Text>
          </TouchableOpacity>
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
    borderTopWidth: 0.6,
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
