import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';



const colorIcon = '#827A7A';
const DetailHeader = ({navigation}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.backContainer}>
        <Ionicons
          name="arrow-back-circle-sharp"
          size={30}
          color={colorIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <TouchableOpacity style={styles.inputContainer}
      onPress={()=> {navigation.navigate('SearchScreen');}}
      >
        <FontAwesome name="search" size={24} color="black" />
        <Text> Tìm kiếm </Text>
      </TouchableOpacity>

      <View style={styles.cartContainer}>
        <AntDesign name="shoppingcart" size={20} color="#fff" 
        onPress={()=>{navigation.navigate('CartScreen');}}
        />
      </View>

      <View style={styles.ellipsisContainer}>
        <Ionicons
          name="ellipsis-vertical-circle-sharp"
          size={30}
          color={colorIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#fff',
  },
  backContainer: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    backgroundColor: colorIcon,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    marginBottom: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  cartContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginLeft: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorIcon,
  },
  ellipsisContainer: {
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DetailHeader;
