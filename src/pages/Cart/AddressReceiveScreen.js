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
import ProvinceComponent from '../../components/AddressReceive/ProvinceComponent';
import {getProvince} from '../../networking/Server';
import SelectBox from 'react-native-multi-selectbox';
import { Picker } from '@react-native-community/picker'
export default class AddressReceiveScreen extends Component {
  constructor() {
    super();
    this.state = {
      provinceData: [],
      filterProvince: [],
      selectProvince: '',
      province: 'Tỉnh táo lên, không có tỉnh thành nào ở đây cả',
      province_id: [],
      selectedValue: 'java',
    };
  }

  //======================================
  componentDidMount() {
    this.refreshProvinceFromServer();
  }

  //======================================
  setProvince(pro) {
    console.log('có chạy vô setProvince', pro);
    this.setState({province: pro});
  }

  //======================================
  getProvince_id = id => {
    this.setState({province_id: id});
  };

  //======================================
  refreshProvinceFromServer = () => {
    getProvince()
      .then(provinces => {
        this.setState({provinceData: provinces});
      })
      .catch(error => {
        this.setState({provinceData: []});
      });
  };

  //======================================
  handleSelectProvince(text) {
    if (text) {
      const newData = this.state.provinceData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({filterProvince: newData});
    } else if (text == '') {
      this.setState({filterProvince: this.state.provinceData});
    }
  }

  //======================================
  functionProvince(text) {
    console.log('hi province', text);
    this.setState({selectProvince: text});
  }

  //======================================
  renderOutsideTouchable(onTouch) {
    console.log('renderOutsideTouchable');
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;

    return (
      console.log('nè he'),
      (
        <TouchableWithoutFeedback
          onPress={onTouch}
          style={{flex: 1, width: '100%'}}>
          {view}

          {this.setProvince()}
        </TouchableWithoutFeedback>
      )
    );
  }
  //======================================
  onChange() {
    console.log('hiii');
  }
  //======================================

  CustomTextInput(navigation, name) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GetProvince', {timtinh: this.setProvince});
          console.log('log check:', this.state.province);
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{marginTop: 15}}>{name}</Text>
          <AntDesign
            style={{alignSelf: 'center'}}
            name="down"
            size={14}
            color="black"
          />
        </View>
        <View
          style={{
            borderBottomWidth: 0.3,
            borderColor: 'black',
            marginTop: 5,
            // #E5E5E5
          }}
        />
      </TouchableOpacity>
    );
  }

  setSelectedValue(value) {
    this.setState({selectedValue: value});
  }

  render() {
    const {navigation} = this.props;

    // console.log("có tỉnh nào ko:", route.params.timtinh)
    const {onTouchOutside} = this.props;

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
              Địa chỉ nhận hàng
            </Text>
          </View>
        </View>

        {/* Bắt đầu phần body */}
        <View style={{backgroundColor: '#fff', padding: 10, paddingBottom: 30}}>
          <View>
            <TextInput
              placeholder="Tên người nhận"
              underlineColorAndroid="#E5E5E5"></TextInput>
            <TextInput
              placeholder="Số điện thoại"
              underlineColorAndroid="#E5E5E5"
              keyboardType="numeric"></TextInput>
            <CustomTextInput
              navigation={navigation}
              name={this.state.province}
              handle={this.setProvince}
            />

            {/* <Picker
              selectedValue={this.state.selectedValue}
              mode="dropdown"
              placeholder="Tỉnh/Thành nè"
              onValueChange={itemValue => setSelectedValue(itemValue)}>

              {this.state.provinceData.map(item => {
                return;
                <Picker.Item
                  label={item.name.toString()}
                  value={item.name.toString()}
                  key={item.id.toString()}
                />;
              })}
            </Picker> */}
          </View>

          {/* <View style={{flexDirection:'row', justifyContent:'space-between'}}>
               {this.renderOutsideTouchable(onTouchOutside)}
             
                 <TextInput
                
                  value={this.state.province}
                  placeholder="Tỉnh/Thành phố *"
                  placeholderTextColor='black'
                  //  underlineColorAndroid="#E5E5E5"
                  onChangeText={text => {
                    this.handleSelectProvince(text);
                  }}></TextInput>
             <AntDesign style={{alignSelf:'center'}}
             name="down" size={14} color="black" />
               <ProvinceComponent
                navigation={navigation}
                data={this.state.filterProvince}
               // province={this.functionProvince}
                province_id={this.getProvince_id}
                
              /> 
            </View>   
            {this.CustomTextInput(navigation,this.state.province)}
            
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GetProvince');
              }}>
            
            <CustomTextInput
                navigation={navigation}
                 text="Tỉnh"
                 province={this.state.province}
                 pro={this.setProvince}
                province={this.setProvince}
                pro={this.state.province}
              />
            </TouchableOpacity> */}
          <TextInput underlineColorAndroid="#E5E5E5">Quận/Huyện</TextInput>
          <TextInput underlineColorAndroid="#E5E5E5">Xã/Phường</TextInput>
          <TextInput underlineColorAndroid="#E5E5E5">
            Số nhà + Tên đường
          </TextInput>
        </View>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}

class CustomTextInput extends Component {
  render() {
    const {navigation, name, handle} = this.props;
    // console.log("handle thứ nhất:", handle)

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GetProvince', {handle: this.handle});
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{marginTop: 15}}>{name}</Text>
          <AntDesign
            style={{alignSelf: 'center'}}
            name="down"
            size={14}
            color="black"
          />
        </View>
        <View
          style={{
            borderBottomWidth: 0.3,
            borderColor: 'black',
            marginTop: 5,
            // #E5E5E5
          }}
        />
      </TouchableOpacity>
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
});
