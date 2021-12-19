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
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Avatar} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';

const SettingAccount = ({navigation}) => {
  const [data, setData] = useState({
    name: 'Loading...',
    phonenum: 'Loading...',
    birthday: 'Loading...',
    sex: '',
    avt: 'Loading...',
    email: 'Loading...',
    id: '',
    token: '',
  });
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const [male, setMale] = useState();
  const [female, setFemal] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [birthdaytext, setbirthdaytext] = useState('01/01/2000');

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        const valueid = await AsyncStorage.getItem('id');
        getInfo(valueid, value);
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
                name: d.name,
                phonenum: d.phone,
                avt: d.avt.replace('127.0.0.1', '10.0.2.2'),
                sex: d.sex,
                email: d.email,
                birthday: d.dateofbirth,
                id: d.id,
                token: token,
              });
              console.log('giới tính render: ', d.sex);
              if (d.sex == 'Male') {
                setMale(true);
                setFemal(false);
              } else if (d.sex == 'Female') {
                setFemal(true);
                setMale(false);
              }
            });
          }
        })
        .then(res => {
          //console.log("reponse :", res);
        })
        .catch(error => {
          console.error('eroor', error);
          return {name: 'network error', description: ''};
        });
    };
    getData();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tem = new Date(currentDate);
    let fDate =tem.getFullYear()+ '-' + tem.getDate() + '-' + tem.getMonth();
    setbirthdaytext(fDate);
    setData({
      ...data,
      birthday: fDate
    })
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const handleNameChange = val => {
    setData({
      ...data,
      name: val,
    });
  };
  const handlePhonenumberChange = val => {
    setData({
      ...data,
      phonenum: val,
    });
  };
  const HandleMaleChange = () => {
    console.log('trước sex male: ', male);
    if (male) {
      setMale(false);
    } else if (!male) {
      setMale(true);
    }
    console.log('sex male: ', male);
  };
  const HandleFemaleChange = () => {
    console.log('trước sex female: ', female);
    setFemal(!female);
    console.log('sex female: ', female);
  };
  //Hàm upload thông tin
  const UpdateData = async () => {
    console.log("token: ", data.token);
    await fetch('http://10.0.2.2:8000/user/' + data.id + '/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token,
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        phone: data.phonenum,
        sex: data.sex,
        dateofbirth: birthdaytext,
      }),
      //body: JSON.stringify({"email": data.email, "name": d.name, "phone": d.phonenum, "sex": d.sex, "dateofbirth": data.birthday})
    })
      .then(response => {
        //console.log("status: ", response.status)
        if (response.status == 200) {
          alert('Update successfully!');
        } else {
          alert('Error: There is some errors occour!');
        }
      })
      .then(res => {
        console.log('reponse :', res);
      })
      .catch(error => {
        console.error('eroor', error);
        return {name: 'network error', description: ''};
      });
  };
  //Hàm upload Avtar
  const UploadImage = async val => {
    var img = {
      uri: val,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    var form = new FormData();
    form.append('avt', img);
    form.append('email', data.email);
    fetch('http://10.0.2.2:8000/user/' + data.id + '/', {
      body: form,
      method: 'PUT',
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
        alert('Succes ' + responseData);
      })
      .done();
  };
  //Hàm xử lý chọn ảnh từ camera
  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setData({
        ...data,
        avt: image.path,
      });
      UploadImage(image.path);
      bs.current.snapTo(1);
    });
  };
  //Hàm xử lý chọn ảnh từ thư viện
  const choosePhotoFromLibrary = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      //console.log(image);
      setData({
        ...data,
        avt: image.path,
      });
      UploadImage(image.path);
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
  return (
    <View style={{flex: 1}}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('Profile');
              navigation.goBack();
            }}>
            <MaterialIcons name="arrow-back" size={scale(27)} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.containeravt}>
            <Avatar.Image
              style={{backgroundColor: '#FFF'}}
              size={scale(widthofscreen / 6.5)}
              source={{uri: data.avt}}
            />
            <TouchableOpacity
              style={styles.camera}
              onPress={() => {
                bs.current.snapTo(0);
              }}>
              <Icon name="camera" size={scale(12)} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                marginBottom: scale(20),
                marginTop: scale(10),
                fontSize: scale(20),
              }}>
              Thông tin tài khoản
            </Text>
          </View>

          <View>
            <Text style={{marginLeft: scale(10), fontSize: scale(14)}}>
              Họ tên
            </Text>
            <TextInput
              style={styles.input}
              defaultValue={data.name}
              onChangeText={val => handleNameChange(val)}></TextInput>
          </View>

          <View style={{marginTop: 10}}>
            <Text style={{marginLeft: scale(10), fontSize: scale(14)}}>
              Số điện thoại
            </Text>
            <TextInput
              style={styles.input}
              defaultValue={data.phonenum}
              keyboardType="numeric"
              onChangeText={val => handlePhonenumberChange(val)}></TextInput>
          </View>

          <View
            style={{
              marginTop: 10,
              borderBottomWidth: 0.5,
              marginLeft: scale(10),
              marginRight: scale(10),
            }}>
            <Text style={{fontSize: scale(14)}} size={scale(10)}>
              Ngày sinh
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: scale(10),
                paddingBottom: scale(10),
              }}>
              <Text>{data.birthday}</Text>
              <TouchableOpacity onPress={() => showMode('date')}>
                <Fontisto name="date" size={scale(20)} />
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginLeft: scale(10),
              marginTop: scale(10),
            }}>
            <Text style={{fontSize: scale(14)}}>Giới tính:</Text>
            <View style={{flexDirection: 'row', marginTop: scale(5)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CheckBox
                  disabled={false}
                  value={male}
                  onValueChange={() => {
                    setMale(!male);
                  }}
                />

                <Text style={{marginLeft: scale(5)}}>Nam</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: scale(10),
                }}>
                <CheckBox
                  disabled={false}
                  value={female}
                  onValueChange={() => {
                    setFemal(!female);
                  }}
                />

                <Text style={{marginLeft: scale(5)}}>Nữ</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.setting}>
          <TouchableOpacity style={styles.itemsetting}>
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '400',
                marginLeft: scale(10),
              }}>
              Đổi mật khẩu
            </Text>
            <Entypo
              name="chevron-small-right"
              size={scale(24)}
              style={{marginLeft: scale(10)}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: scale(5),
            marginTop: scale(15),
          }}>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => {
              UpdateData();
            }}>
            <Text
              style={{fontSize: scale(17), fontWeight: '400', color: '#FFF'}}>
              Cập nhật thay đổi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const heightofscreen = Dimensions.get('window').height;
const widthofscreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
  buttoncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    backgroundColor:"#FF5F04",
    //backgroundColor: '#93F48A',
    borderRadius: scale(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    height: heightofscreen / 20,
  },
  setting: {
    flexDirection: 'column',
  },
  itemsetting: {
    flexDirection: 'row',
    marginTop: scale(10),
    borderBottomWidth: 0.2,
    paddingBottom: scale(10),
    justifyContent: 'space-between',
  },
  container: {
    width: widthofscreen,
    height: scale(heightofscreen / 6),
    backgroundColor: '#316C49',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
  },
  containeravt: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(20),
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: scale(20),
    left: scale(20),
    borderColor: '#000',
    borderWidth: 0.5,
  },
  input: {
    borderBottomWidth: 0.5,
    color: '#B6C7D1',
    marginLeft: scale(10),
    marginRight: scale(10),
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
    // elevation: 5,
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
    backgroundColor: '#316C49',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default SettingAccount;
