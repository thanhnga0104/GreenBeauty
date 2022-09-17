import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import {getProductById} from '../../networking/Server';
const Rating = props => {
  const [data, setData] = useState({
    comment: '',
    token: '',
  });
  const [defaultRating, setdefaultRating] = useState(5);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const starImgFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
  const starImgCorner =
    'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';
  const [Img, setImg] = useState(null);

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const [product, setProduct] = useState({
    imagepresent: 'http://127.0.0.1:8000/media/logo-uit.png',
    name: 'loading',
    price: 'loading',
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        setData({
          ...data,
          token: value,
        });
        if (value !== null) {
        }
      } catch (e) {
        alert('no data');
      }
    };
    const getInformation = () => {
      getProductById(props.id).then(result => {
        setProduct(result);
      });
    };
    getData();
    getInformation();
  }, []);

  async function setRating(id) {
    const apiSetRatingById =
      'http://10.0.2.2:8000/detailorder/' + id + '/set-rating/';
    try {
      let response = await fetch(apiSetRatingById, {
        method: 'POST',
      });
      return true;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  const handleCommentChange = val => {
    setData({
      ...data,
      comment: val,
    });
  };
  const UploadRating = async () => {
    var img = {
      uri: Img,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    var form = new FormData();
    form.append('img', img);
    form.append('comment', data.comment);
    form.append('point', defaultRating);
    fetch('http://10.0.2.2:8000/product/' + props.id + '/add-rating/', {
      body: form,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + data.token,
      },
    })
      .then(response => response.json())
      .catch(error => {
        alert('ERROR ' + error);
      })
      .then(responseData => {
        setRating(props.order);
        alert('Success');
      })
      .done();
  };
  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImg(image.path);
      bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImg(image.path);
      bs.current.snapTo(1);
    });
  };
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          takePhotoFromCamera();
        }}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          choosePhotoFromLibrary();
        }}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const CustomRatingBar = () => {
    return (
      <View style={styles.CustomRatingBar}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setdefaultRating(item)}>
              <Image
                style={styles.starImg}
                source={
                  item <= defaultRating
                    ? {uri: starImgFilled}
                    : {uri: starImgCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={{
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginTop: 5,
      }}>
      <BottomSheet
        ref={bs}
        snapPoints={[400, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'center',
          }}>
          <Image
            style={styles.Image}
            source={{
              uri: product.imagepresent.replace('127.0.0.1', '10.0.2.2'),
            }}
          />
          <View style={{flexDirection: 'column', marginTop: 5}}>
            <Text
              style={{marginTop: 10}}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {product.name}
            </Text>
            <View style={{margin: 10, flexDirection: 'column'}}>
              <Text style={{color: 'red', marginLeft: 5}}>{product.price}</Text>
            </View>
          </View>
        </View>
        <CustomRatingBar />
        <TextInput
          style={styles.InputText}
          multiline={true}
          size={scale(20)}
          placeholder="Hãy mô tả cảm nhận về sản phẩm <3"
          placeholderTextColor="#000000"
          onChangeText={val => handleCommentChange(val)}></TextInput>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: scale(10)}}
            onPress={() => {
              bs.current.snapTo(0);
            }}>
            <View style={styles.AddImage}>
              <Feather name="camera" size={scale(30)} />
              <Text>Thêm ảnh</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.ShowImage}>
            <Image style={styles.Img} source={{uri: Img}} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => UploadRating()}>
        <Text style={{color: '#FFF'}}>ĐÁNH GIÁ</Text>
      </TouchableOpacity>
    </View>
  );
};
const heightwin = Dimensions.get('window').height;
const widthwin = Dimensions.get('window').width;
const styles = StyleSheet.create({
  CustomRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: scale(20),
  },
  starImg: {
    width: scale(40),
    height: scale(40),
    resizeMode: 'cover',
  },
  Img: {
    width: scale(90),
    height: scale(90),
    resizeMode: 'cover',
  },
  InputText: {
    borderWidth: 2,
    borderColor: '#14A445',
    height: heightwin * 0.2,
    backgroundColor: '#FFF',
    margin: scale(10),
    marginTop: scale(20),
    borderRadius: 15,
  },
  AddImage: {
    height: scale(90),
    width: scale(90),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ShowImage: {
    height: scale(90),
    width: scale(90),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(10),
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#93F48A',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: '#14A445',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  Image: {
    width: scale(70),
    height: scale(70),
    margin: 10,
  },
});
export default Rating;
