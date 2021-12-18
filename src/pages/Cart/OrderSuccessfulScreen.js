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
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

export default class OrderSuccessfullScreen extends Component{
    render(){
        const {navigation}=this.props;
        return(
            <View >
                <Text>Đặt hàng thành công</Text>
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('HomeScreen')}}>
                    <Text>Trang chủ</Text>
                </TouchableOpacity>
            </View>
        );
    }
}