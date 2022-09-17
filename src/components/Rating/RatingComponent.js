import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RatingComponent = props => {
  const starImgFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
  const starImgCorner =
    'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';
  const [data, setData] = useState({
    avt: 'http://127.0.0.1:8000/media/logo-uit.png',
    phonenum: 'loading...',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');

        getInfo(props.id, value);
        if (value !== null) {
        }
      } catch (e) {
        alert('no data');
      }
    };
    const getInfo = async (id, token) => {
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
              setData({
                ...data,
                phonenum: d.phone,
                avt: d.avt,
              });
            });
          }
        })
        .then(res => {})
        .catch(error => {
          console.error('error:', error);
          return {name: 'network error', description: ''};
        });
    };

    getData();
  }, []);

  const CustomRatingBar = () => {
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
    return (
      <View style={styles.CustomRatingBar}>
        {maxRating.map((item, key) => {
          return (
            <View key={item}>
              <Image
                style={styles.starImg}
                source={
                  item <= props.point
                    ? {uri: starImgFilled}
                    : {uri: starImgCorner}
                }
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Avatar.Image
          style={{backgroundColor: '#FFF', margin: scale(15)}}
          size={scale(30)}
          source={{uri: data.avt.replace('127.0.0.1', '10.0.2.2')}}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={{marginTop: scale(15)}}>
            {'******' + data.phonenum.slice(6)}
          </Text>
          <CustomRatingBar />
        </View>
      </View>
      <Text
        ellipsizeMode="tail"
        numberOfLines={5}
        style={{
          width: Dimensions.get('window').width * 0.7,
          marginTop: scale(15),
          marginLeft: scale(60),
        }}>
        {props.comment}
      </Text>

      <Image
        style={styles.Image}
        source={{uri: props.img.replace('127.0.0.1', '10.0.2.2')}}
      />
      <View style={styles.line}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  starImg: {
    width: scale(10),
    height: scale(10),
    resizeMode: 'cover',
  },
  CustomRatingBar: {
    marginTop: 5,
    flexDirection: 'row',
  },
  Image: {
    marginTop: scale(15),
    marginLeft: scale(60),
    height: 120,
    width: 120,
    resizeMode: 'cover',
    borderWidth: 1,
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#000',
    marginTop: 15,
  },
});
export default RatingComponent;
