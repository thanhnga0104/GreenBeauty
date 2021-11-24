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
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getProvince} from '../../networking/Server';
import WardComponent from './WardComponent';
import DistrictComponent from './DistrictComponent';
import CityComponent from './CityComponent';

export default class LocationScreen extends Component {
  constructor() {
    super();
    this.state = {
      // provinceData: [],
      // filterProvince: [],
      city_id: null,
      district_id: null,
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

  setProvinceID = id => {
    this.setState({city_id: id});
  };
  setDistrictID = id => {
    this.setState({district_id: id});
  };

  render() {
    const {navigation} = this.props;
    // console.log("id:", this.state.city_id)
    return (
      <SafeAreaView style={{flex: 1, height:'100%'}}>
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
            <Text style={styles.titleHeader}>Địa chỉ nhận hàng</Text>
          </View>
        </View>

        <View style={{backgroundColor: '#fff', padding: 10, height:'100%'}}>
          <View>
            <TextInput
              placeholder="Tên người nhận"
              underlineColorAndroid="#E5E5E5"></TextInput>

            <TextInput
              placeholder="Số điện thoại"
              underlineColorAndroid="#E5E5E5"
              keyboardType="numeric"></TextInput>
            <View>
              <CityComponent
                navigation={navigation}
                name={'Tỉnh/Thành phố*'}
                city_id={this.setProvinceID}
              />
            </View>
            <View>
              <DistrictComponent
                navigation={navigation}
                name={'Quận/Huyện'}
                city_id={this.state.city_id}
                district_id={this.setDistrictID}
              />
            </View>
            <View>
              <WardComponent
              navigation={navigation}
              name={'Phường/Xã'}
              city_id={this.state.city_id}
              district_id={this.state.district_id}
               />
            </View>
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
});
