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

export default class RecommendProductScreen extends Component{
    render(){
        const {navigation}=this.props;
        return(
            <View >
                <Text>Gợi ý sản phẩm</Text>
                <TouchableOpacity 
                onPress={()=>{navigation.navigate('HomeScreen')}}>
                    <Text>Trang chủ</Text>
                </TouchableOpacity>
            </View>
        );
    }
}