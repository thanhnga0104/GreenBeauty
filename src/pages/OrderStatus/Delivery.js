import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StatusComponent from '../../components/OrderStatus/Statuscomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Delivery = ({navigation, route}) => {
  const [renderData, setRenderData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const valueid = await AsyncStorage.getItem('id');

        GetData(valueid);

        if (value !== null) {
        }
      } catch (e) {
        console.log(e);
      }
    };
    const GetData = async id => {
      await fetch('http://10.0.2.2:8000/order/?user=' + id + '&status=3', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status == 200) {
            response.json().then(d => {
              setRenderData(d);
            });
          }
        })
        .then(res => {})
        .catch(error => {
          console.error('eroor', error);
          return {name: 'network error', description: ''};
        });
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
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
          <Text style={styles.titleScreen}>Đang giao hàng</Text>
        </View>
      </View>

      <FlatList
        data={renderData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailOrder', {order: item})}>
              <StatusComponent
                id={item.id}
                total={item.totalValue}
                status={item.status}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

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

export default Delivery;
