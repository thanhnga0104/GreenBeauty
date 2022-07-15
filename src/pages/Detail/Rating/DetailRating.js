import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import RatingComponent from '../../../components/Rating/RatingComponent';

export default function DetailRating({navigation, route}) {
  const starImgFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
  const starImgCorner =
    'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';
  const [allSelect, setAllSelect] = useState(true);
  const [oneSelect, setOneSelect] = useState(false);
  const [twoSelect, setTwoSelect] = useState(false);
  const [threeSelect, setThreeSelect] = useState(false);
  const [fourSelect, setFourSelect] = useState(false);
  const [fiveSelect, setFiveSelect] = useState(false);
  const [product, setProduct] = useState(1);
  const [renderData, setRenderData] = useState([]);

  useEffect(() => {
    const GetData = () => {
      let {id} = route.params;
      setProduct(id);
      getFulldata(id);
    };
    const getFulldata = async id => {
      await fetch('http://10.0.2.2:8000/rating/' + id + '/0/', {
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
    GetData();
  }, []);

  const getData = async val => {
    await fetch('http://10.0.2.2:8000/rating/' + product + '/' + val + '/', {
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
  const HandleChangeClick = val => {
    if (val == 0) {
      setAllSelect(true);
      setOneSelect(false);
      setTwoSelect(false);
      setThreeSelect(false);
      setFourSelect(false);
      setFiveSelect(false);
    } else if (val == 1) {
      setAllSelect(false);
      setOneSelect(true);
      setTwoSelect(false);
      setThreeSelect(false);
      setFourSelect(false);
      setFiveSelect(false);
    } else if (val == 2) {
      setAllSelect(false);
      setOneSelect(false);
      setTwoSelect(true);
      setThreeSelect(false);
      setFourSelect(false);
      setFiveSelect(false);
    } else if (val == 3) {
      setAllSelect(false);
      setOneSelect(false);
      setTwoSelect(false);
      setThreeSelect(true);
      setFourSelect(false);
      setFiveSelect(false);
    } else if (val == 4) {
      setAllSelect(false);
      setOneSelect(false);
      setTwoSelect(false);
      setThreeSelect(false);
      setFourSelect(true);
      setFiveSelect(false);
    } else {
      setAllSelect(false);
      setOneSelect(false);
      setTwoSelect(false);
      setThreeSelect(false);
      setFourSelect(false);
      setFiveSelect(true);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{marginTop: scale(15), marginLeft: scale(15)}}
          onPress={() => {
            getData(0);
            HandleChangeClick(0);
          }}>
          <View style={allSelect ? styles.Button1 : styles.Button}>
            <Text>Tất cả</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: scale(15), marginLeft: scale(15)}}
          onPress={() => {
            getData(1);
            HandleChangeClick(1);
          }}>
          <View style={oneSelect ? styles.Button1 : styles.Button}>
            <Image style={styles.starImg} source={{uri: starImgFilled}} />
            <Text>1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: scale(15), marginLeft: scale(15)}}
          onPress={() => {
            getData(2);
            HandleChangeClick(2);
          }}>
          <View style={twoSelect ? styles.ButtonImage1 : styles.ButtonImage}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
            </View>
            <Text>2</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={{marginLeft: scale(15)}}
          onPress={() => {
            getData(3);
            HandleChangeClick(3);
          }}>
          <View style={threeSelect ? styles.ButtonImage1 : styles.ButtonImage}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
            </View>
            <Text>3</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginLeft: scale(10)}}
          onPress={() => {
            getData(4);
            HandleChangeClick(4);
          }}>
          <View style={fourSelect ? styles.ButtonImage1 : styles.ButtonImage}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
            </View>
            <Text>4</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginLeft: scale(10)}}
          onPress={() => {
            getData(5);
            HandleChangeClick(5);
          }}>
          <View style={fiveSelect ? styles.ButtonImage1 : styles.ButtonImage}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
              <Image style={styles.starImg} source={{uri: starImgFilled}} />
            </View>
            <Text>5</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <FlatList
        data={renderData}
        renderItem={({item}) => {
          return (
            <RatingComponent
              point={item.ratingpoint}
              id={item.user}
              comment={item.ratingcomment}
              img={'http://127.0.0.1:8000' + item.img}
            />
          );
        }}
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
}
const heightwin = Dimensions.get('window').height;
const widthwin = Dimensions.get('window').width;
const styles = StyleSheet.create({
  starImg: {
    width: scale(10),
    height: scale(10),
    resizeMode: 'cover',
  },
  Button: {
    height: scale(40),
    width: widthwin / 4,
    backgroundColor: '#CBD0CC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  Button1: {
    height: scale(40),
    width: widthwin / 4,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#14A445',
    borderWidth: 1,
  },
  ButtonImage: {
    height: scale(40),
    width: widthwin / 4,
    backgroundColor: '#CBD0CC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'column',
  },
  ButtonImage1: {
    height: scale(40),
    width: widthwin / 4,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'column',
    borderColor: '#14A445',
    borderWidth: 1,
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#000',
    marginTop: 5,
  },
});
