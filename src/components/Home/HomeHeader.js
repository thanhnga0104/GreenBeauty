import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeHeader = ({navigation}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.menuContainer}>
        <Feather name="menu" size={28} color="#fff"
         onPress={()=>{navigation.openDrawer()}}
           />
      </View>
      <TouchableOpacity
       style={styles.inputContainer}
       onPress={()=>{navigation.navigate('SearchScreen');}}
       >
        <FontAwesome name="search" size={14} color="#969696"    />
        <Text style={styles.inputText}> Tìm kiếm sản phẩm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartContainer} onPress={()=>{navigation.navigate('CartScreen');}}>
        <AntDesign name="shoppingcart" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingBottom: 4,
    backgroundColor: '#316C49',
  },

  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },

  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '400',
  },

  menuContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeHeader;
