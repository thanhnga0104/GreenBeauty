import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
} from 'react-native';
import HomeHeader from '../../components/Home/HomeHeader';
import HomeProductSection from '../../components/Home/HomeProductSection';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // paddingTop: StatusBar.currentHeight
      }}>
      <StatusBar backgroundColor="#316C49" barStyle="light-content" />
      <HomeHeader navigation={navigation}/>
      <View style={styles.bodyContainer}>
        <HomeProductSection navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#E5E5E5',
  },
});
export default HomeScreen;
