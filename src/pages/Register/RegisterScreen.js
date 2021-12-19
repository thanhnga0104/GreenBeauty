import React from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const RegisterScreen = ({navigation}) => {
  const [loading, setloading] = React.useState(false);
  const [data, setData] = React.useState({
    email: '',
    password: '',
    retypepassword: '',
    check_textinputchange: false,
    securetextentry: true,
    securetextentry2: true,
  });

  const textInputChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textinputchange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textinputchange: false,
      });
    }
  };

  const hadlepwchange = val => {
    setData({
      ...data,
      password: val,
    });
  };
  const hadlerepwchange = val => {
    setData({
      ...data,
      retypepassword: val,
    });
  };
  const updatesercuretext = () => {
    setData({
      ...data,
      securetextentry: !data.securetextentry,
    });
  };
  const updatesercuretext2 = () => {
    setData({
      ...data,
      securetextentry2: !data.securetextentry2,
    });
  };

  const HadleRegister = async (email, pw, rpw) => {
    if (pw === rpw) {
      await fetch('http://10.0.2.2:8000/register/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: pw}),
      })
        .then(response => {
          if (response.status == 201) {
            alert(
              'register successfully, check your email to verify your account!',
            );
          } else {
            alert('This mail is already existed');
          }
          setloading(false);
        })
        .then(res => {
          console.log('reponse :', res);
        })
        .catch(error => {
          console.error('eroor', error);
          return {name: 'network error', description: ''};
        });
    } else {
      alert('password and retype password not the same!');
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ECF3F9',
        justifyContent: 'space-between',
      }}>
      <ImageBackground
        source={require('../../assets/image/bg.jpg')}
        style={styles.container}>
        <View style={styles.container1}>
          <Image
            source={require('../../assets/image/logo1.png')}
            style={styles.logo}
          />
        </View>
      </ImageBackground>
      {/* bottom view */}
      <View style={styles.Inputcontainer}>
        <View style={{padding: scale(10)}}>
          <Text style={{color: '#006C25', fontSize: scale(25)}}>Welcome</Text>
          <Text style={{fontSize: scale(15)}}>
            Let's join GreenBeauty's House
          </Text>
        </View>
        {/*change:  */}
        <View style={{marginTop: scale(5)}}>
          <Text style={{color: '#B6C7D1', fontSize: scale(12)}}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={scale(12)} />
            <TextInput
              style={styles.input}
              placeholder="Your email"
              keyboardType="email-address"
              onChangeText={val => textInputChange(val)}></TextInput>
            {data.check_textinputchange ? (
              <Feather name="check-circle" color="green" size={scale(12)} />
            ) : null}
          </View>

          <Text style={{color: '#B6C7D1', fontSize: scale(12)}}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={scale(12)} />
            <TextInput
              style={styles.input}
              placeholder="************"
              keyboardType={'default'}
              secureTextEntry={data.securetextentry ? true : false}
              onChangeText={val => hadlepwchange(val)}></TextInput>
            <TouchableOpacity onPress={updatesercuretext}>
              {data.securetextentry ? (
                <Feather name="eye-off" color="gray" size={scale(12)} />
              ) : (
                <Feather name="eye" color="gray" size={scale(12)} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={{color: '#B6C7D1', fontSize: scale(12)}}>
            Retype Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={scale(12)} />
            <TextInput
              style={styles.input}
              placeholder="************"
              keyboardType={'default'}
              secureTextEntry={data.securetextentry2 ? true : false}
              onChangeText={val => hadlerepwchange(val)}></TextInput>
            <TouchableOpacity onPress={updatesercuretext2}>
              {data.securetextentry2 ? (
                <Feather name="eye-off" color="gray" size={scale(12)} />
              ) : (
                <Feather name="eye" color="gray" size={scale(12)} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setloading(true);
            HadleRegister(data.email, data.password, data.retypepassword);
          }}>
          <Text style={{color: '#FFF'}}>REGISTER</Text>
        </TouchableOpacity>
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            bottom: Dimensions.get('window').height / 3.6,
            position: 'absolute',
          }}
          size="large"
          animating={loading}
          color="green"
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '60%'}}>
          <View
            style={{
              flex: 1,
              height: 1,
              borderWidth: 0.25,
              borderColor: '#000',
            }}></View>
          <Text style={{width: scale(40), textAlign: 'center'}}>OR</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              borderWidth: 0.25,
              borderColor: '#000',
            }}></View>
        </View>

        <TouchableOpacity
          style={styles.registercontainer}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: '#039B52'}}>Already have account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const heightofscreen = Dimensions.get('window').height;
const widthofscreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    marginTop: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  registercontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: scale(15),
    color: '#B6C7D1',
    marginTop: scale(-15),
  },
  container: {
    height: scale(heightofscreen / 4),
    resizeMode: 'cover',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    backgroundColor: '#ECF3F9',
    bottom: scale(30),
    borderRadius: 30,
    height: heightofscreen / 3,
  },
  Inputcontainer: {
    bottom: scale(40),
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    marginLeft: 30,
    marginRight: 30,
    height: Dimensions.get('window').height / 1.8,
    borderRadius: 20,
    padding: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: scale(10),
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: '#14A445',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RegisterScreen;
