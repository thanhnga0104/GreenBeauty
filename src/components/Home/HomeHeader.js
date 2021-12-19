import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class HomeHeader extends Component {
  render() {
    const {navigation} = this.props;
    const {quantityOfCart} = this.props;
    return (
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
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <FontAwesome name="search" size={14} color="#969696" />
          <Text style={styles.inputText}> Tìm kiếm sản phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => {
            navigation.navigate('CartScreen');
          }}>
          <AntDesign name="shoppingcart" size={28} color="#fff" />

          {quantityOfCart > 0 ? (
            <View style={styles.circle}>
              <Text
                style={{
                  fontSize: scale(7),
                  fontWeight: 'bold',
                  color: '#FFF',
                }}>
                {quantityOfCart}
              </Text>
            </View>
          ) : (
            <View>
              <Text> </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

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
});
