import React from "react";
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const SearchHeader=({navigation})=>{
    return(
        <View style={styles.headerContainer}> 
        <Ionicons name="arrow-back" size={32} color="black" 
        onPress={()=>{navigation.goBack();}}/>
        <View style={styles.inputContainer}>
        <EvilIcons name="search" size={24} color="black" />
        <Text> Tìm kiếm </Text>
      </View>



        </View>
    );

};

const styles=StyleSheet.create({
    headerContainer:{
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#fff',
    },
    inputContainer: {
        // backgroundColor: colorIcon,
        flexDirection: 'row',
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
        marginBottom: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
      },
   
});
export default SearchHeader;