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

export default class AddressScreen extends Component{
    render(){
        const {navigation} = this.props;
        return(
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
                <Text style={styles.titleHeader}>Địa chỉ nhận hàng</Text>
              </View>
            </View>

            {/* Bắt đầu body */}
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