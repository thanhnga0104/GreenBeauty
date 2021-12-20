import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text, StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ThanhPhanComponent extends Component {
  render() {
    const {navigation, route} = this.props;
    const {product} = route.params;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
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
            <Text style={styles.titleScreen}>Thành phần sản phẩm</Text>
          </View>
        </View>
        <View style={{padding:10}}>
          <Text style={{fontSize:16}}>{product.Ingredient}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

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

  titleScreen: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
});
