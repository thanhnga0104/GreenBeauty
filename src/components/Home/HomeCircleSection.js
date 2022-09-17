import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeCircleSection = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => {
          navigation.navigate('CategoryHome');
        }}>
        <View style={styles.categoryContainer}>
          <Ionicons name="grid" size={28} color="#fff" />
        </View>
        <View>
          <Text>Danh mục</Text>
        </View>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <View style={styles.dealsContainer}>
          <Ionicons name="pricetag" size={28} color="#fff" />
        </View>
        <View>
          <Text>Deals</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.bestSellerContainer}>
          <Text style={{color: '#fff'}}>No.1</Text>
        </View>
        <View>
          <Text>Bán chạy</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.listPriceContainer}>
          <Ionicons name="grid" size={28} color="#fff" />
        </View>
        <View>
          <Text>Bảng giá</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  categoryContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#6DCC5D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dealsContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#FF044F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bestSellerContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#FF5F04',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listPriceContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#3AB698',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeCircleSection;
