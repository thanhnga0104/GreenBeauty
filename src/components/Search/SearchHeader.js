import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SearchHeader extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="#7D7D7D"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={{marginHorizontal:10}}>
            <FontAwesome name="search" size={14} color="#7D7D7D" />
          </View>
          <TextInput style={styles.inputText} placeholder="Tìm sản phẩm, thương hiệu, ...?" ></TextInput>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
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
    borderEndColor:"#7D7D7D",
  },

  backContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputText:{
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:4
  }
});
