import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export default class CategoryHeader extends Component {
  render() {
    const {navigation} = this.props;
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

        <View style={styles.inputContainer}>
          <View style={{marginHorizontal: 10}}>
            <FontAwesome name="search" size={14} color="#7D7D7D" />
          </View>
          <TextInput
            style={styles.inputText}
            placeholder="Tìm sản phẩm, thương hiệu, ...?"></TextInput>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#316C49',
  },
  inputContainer: {
    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    flex: 1,
    height: 35,
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 4,
    borderWidth: 0.3,
    borderEndColor: '#7D7D7D',
  },

  menuContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
});
