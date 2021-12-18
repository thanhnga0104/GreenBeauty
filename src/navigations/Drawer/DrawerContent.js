import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function DrawerContent(props) {
  const [data, setData] = useState({
    name: 'Loading...',
    phonenum: 'Loading...',
    avt: 'http://127.0.0.1:8000/media/logo-uit.png',
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        const valueid = await AsyncStorage.getItem('id');
        console.log('value: ', value);

        getInfo(valueid, value);
        if (value !== null) {
        }
      } catch (e) {
        alert('no data');
      }
    };
    const getInfo = async (id, token) => {
      console.log('token: ', 'Bearer ' + token);
      await fetch('http://10.0.2.2:8000/user/' + id + '/', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status == 200) {
            response.json().then(d => {
              console.log('name: ', d.name);
              setData({
                ...data,
                name: d.name,
                phonenum: d.phone,
                avt: d.avt,
              });
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
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={style.drawerContent}>
          <View style={style.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: data.avt.replace('127.0.0.1', '10.0.2.2'),
                }}
                size={50}
              />

              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={style.title}> {data.name}</Title>
                <Caption style={style.caption}> {data.phonenum}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={style.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Trang chủ"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Trang cá nhân"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="grid-outline" color={color} size={size} />
              )}
              label="Danh mục"
              onPress={() => {
                props.navigation.navigate('Category');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                // <Ionicons name="grid-outline" color={color} size={size} />
                <FontAwesome name="search" size={22} color={color} />

              )}
              label="Tra cứu thành phần"
              onPress={() => {
                props.navigation.navigate('Ingredients');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={style.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
}

const style = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },

  paragrahp: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  //bottomDrawerSection
  bottomDrawerSection: {
    marginTop: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  //preference
});
