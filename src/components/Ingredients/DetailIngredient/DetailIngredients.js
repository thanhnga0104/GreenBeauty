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
import Ionicons from 'react-native-vector-icons/Ionicons'

function DetailIngredients ({navigation,route}){
    const {dataItem} = route.params;
    return(
        <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity
            onPress={()=>{navigation.goBack()}}>
                <Ionicons name='chevron-back' size={scale(20)}/>
            </TouchableOpacity>
            <View>
                <View style={{flexDirection: "row", marginTop:scale(15)}}>
                    <View style={styles.box, getStyle(dataItem.levelOfSave)}>
                      <Text style={{color:"#FFF"}}>{dataItem.levelOfSave}</Text>
                      </View>
                    <Text style={styles.Text}>{dataItem.name}</Text>
                </View>
                <ScrollView>
                  <View style={styles.RichText}>
                    <Text
                    numberOfLines={100}>
                      {dataItem.Description}
                    </Text>
                  </View>
                  
                </ScrollView>
            </View>
        </SafeAreaView>
    )
    
}
const getStyle = (val) =>
{
 if(val>3)
   return {backgroundColor:"#1627D0", opacity:0.8,alignItems:"center",
   justifyContent:"center",height:scale(50),
   width:scale(50), marginLeft:scale(15)}
 else if(val==3)
   return {backgroundColor:"#C7CB14",alignItems:"center",
   justifyContent:"center",height:scale(50),
   width:scale(50),marginLeft:scale(15)}
 else
   return {backgroundColor: "#D7375E",alignItems:"center",
   justifyContent:"center",height:scale(50),
   width:scale(50),marginLeft:scale(15)}
}
const styles = StyleSheet.create({
    container:{
        padding: scale(20),
        backgroundColor: '#CBD0CC',
        margin: scale(10),
        borderRadius: 5
    },
    box:{
        height:scale(50),
        width:scale(50),
        backgroundColor: "blue",
        opacity:0.8,
        alignItems:"center",
        justifyContent:"center",
        shadowOffset: {
          width: 0,
          height: 2,
            },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: scale(15),
      },
      Text:{
          fontWeight:"bold",
          fontSize: scale(20),
          marginLeft: scale(20)
      },
      RichText:{
        margin: scale(15),
        fontSize: scale(20),
      }
})
export default DetailIngredients;