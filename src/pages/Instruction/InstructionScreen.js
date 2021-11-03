import React, {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
const InstructionScreen = ({navigation, route}) => {
    const {product} = route.params;
    return(
        <View>
            <Text>{product.descrition} </Text>
            
        </View>
    );
}

export default InstructionScreen;