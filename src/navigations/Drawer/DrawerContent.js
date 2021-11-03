import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={style.drawerContent}>
          <View style={style.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-1/p240x240/242615970_882833949332144_3252973852925152393_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=YTsocedvWjoAX_sfpKC&_nc_ht=scontent.fdad1-2.fna&oh=26dbf3fe8a13b87a9c0e822a26ba1f72&oe=617CD70F',
                }}
                size={50}
              />

              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={style.title}> Thanh Nga</Title>
                <Caption style={style.caption}> 19521880</Caption>
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
