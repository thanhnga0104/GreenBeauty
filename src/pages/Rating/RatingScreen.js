import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    ImageBackground,
    Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Item,
  Label,
  TextInput,
  Touchable,
  TouchableOpacityBase,
  TouchableOpacity,
  Button,
  FlatList,
  VirtualizedList
} from 'react-native';
import {scale} from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Rating from '../../components/RatingProduct/Rating';
const RatingScreen = ({navigation,route}) =>{
    const ItemSepatator = () => (
        <View
          style={{
            borderBottomWidth: 0.6,
            borderColor: '#E5E5E5',
          }}
        />
      );
    return(
      <SafeAreaView style={{flex:1}}>
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
          <Text style={styles.titleScreen}>Đánh giá sản phẩm</Text>
        </View>
      </View>
      <FlatList
        data={route.params.detail}
        ItemSeparatorComponent = {ItemSepatator}
        renderItem={({item})=>{
        return(
            !item.isRating?
                <Rating order = {item.id} id={item.product}/>
            :
            null
        )
        }}
        keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
        
    )
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
})
export default RatingScreen;