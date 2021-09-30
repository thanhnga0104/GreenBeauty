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
} from 'react-native';
import {scale} from 'react-native-size-matters'

const RegisterScreen = ({navigation})=>{
    return(
      <SafeAreaView style={{flex:1, backgroundColor:"#ECF3F9", justifyContent:"space-between" }}>
            <ImageBackground source={require('../../assets/image/bg.jpg')} style={styles.container}>
                <View  style={styles.container1}>
                    <Image source = {require("../../assets/image/logo1.png")} style={styles.logo}/>
                </View>
            </ImageBackground>
            {/* bottom view */}
            <View style={styles.Inputcontainer}>
                <View style={{padding: scale(10)}}>
                    <Text style={{color:'#006C25', fontSize: scale(25)}}>Welcome</Text>
                    <Text style={{fontSize: scale(15)}}>Let's join GreenBeauty's House</Text>
                </View>
                <View style={{marginTop:scale(5)}}>
                    <View style={{flexDirection:"column", margin: scale(10)}}>
                        <Text style={{color:"#B6C7D1"}}>Email</Text>
                        <TextInput style={styles.input}
                            placeholder="youremail@gmail.com"
                            keyboardType="email-address"></TextInput>
                    </View>
                    <View style={{flexDirection:"column", margin: scale(10), paddingBottom:1}}>
                        <Text style={{color:"#B6C7D1"}}>Password</Text>
                        <TextInput style={styles.input}
                            placeholder="************"
                            keyboardType={'default'} 
                            secureTextEntry={true}></TextInput>
                    </View>
                    <View style={{flexDirection:"column", margin: scale(10), paddingBottom:1}}>
                        <Text style={{color:"#B6C7D1"}}>Retype your Password</Text>
                        <TextInput style={styles.input}
                            placeholder="************"
                            keyboardType={'default'} 
                            secureTextEntry={true}></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:"#FFF"}}>REGISTER</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:"center"}}>
                <View style={{flexDirection:"row", alignItems:"center", width:"60%"}}>
                    <View style={{ flex:1,height:1,borderWidth:0.25, borderColor:"#000"}}></View>
                    <Text style={{width: scale(40), textAlign:"center"}}>OR</Text>
                    <View style={{flex:1,height:1 ,borderWidth:0.25, borderColor:"#000"}}></View>
                </View>
                
                <TouchableOpacity style={styles.registercontainer} onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={{color:"#039B52"}}>Already have account?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const heightofscreen = Dimensions.get('window').height
const widthofscreen = Dimensions.get('window').width
const styles = StyleSheet.create({
    registercontainer:{
        alignItems:"center",
        justifyContent:"center",
        
    },
    input:{
        height: scale(35),
        borderBottomWidth: 0.5,
        padding: scale(10),
        color:"#B6C7D1"
    },
    container: {
        height: scale( heightofscreen/3.1),
        resizeMode:"cover",
      },
    container1:{
        alignItems:"center",
        justifyContent:"center",
    },
    bottomView:{
        backgroundColor:'#ECF3F9',
        bottom: scale(30),
        borderRadius: 30,
        height:heightofscreen/3,
    },
    Inputcontainer:{
        bottom: scale(40),
        flexDirection:"column",
        backgroundColor:"#FFFFFF",
        marginLeft:30,
        marginRight:30,
        height: Dimensions.get('window').height/1.8,
        borderRadius:20,
        padding:scale(10),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    button:{
      marginTop: scale(10),
        alignItems: "center",
        padding:scale(10),
        backgroundColor:"#14A445",
        marginLeft:30,
        marginRight:30,
        borderRadius:60,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default RegisterScreen