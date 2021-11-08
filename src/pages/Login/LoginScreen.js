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
import { AuthContext } from '../../context/context';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

const LoginScreen =({navigation})=>{
    const { signIn } = React.useContext(AuthContext);
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textinputchange:false,
        securetextentry:true,
    });
    const textInputChange=(val)=>{
        if(val.length != 0)
        {
            setData({
                ...data,
                email: val,
                check_textinputchange:true,
                
            })
        }
        else
        {
            setData({
                ...data,
                email: val,
                check_textinputchange:false,
            })
        }
    }
    const hadlepwchange=(val)=>{
        setData({
            ...data,
            password:val
        });
    }
    const updatesercuretext=()=>{
        setData({
            ...data,
            securetextentry:!data.securetextentry
        })
    }
    const loginHadle = async(email, password)=>{
        //Nhớ add hàm signin signIn(email,password)
        await fetch ('http://10.0.2.2:8000/login/',
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password":password})
        }).then(response=>{
            if(response.status==200)
            {
                response.json().then(data=>{
                    //alert("login successfully!")
                    signIn(data.email, data.tokens);
                })
            }
            else if(response.status==403)
            {
                
                alert("Error: Wrong email or password, please enter again" )
                
            }
            else if (response.status==401)
            {
                alert("Error: Account has not verified yet, please check register mail again" )
            }
        })
        .then(res => {
            console.log("reponse :", res); 
           }).catch(error => {
            console.error("eroor",error);
            return { name: "network error", description: "" };
          });

    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#ECF3F9", justifyContent:"space-between" }}>
            <ImageBackground source={require('../../assets/image/bg.jpg')} style={styles.container}>
                <View  style={styles.container1}>
                    <Image source = {require("../../assets/image/logo1.png")} style={styles.logo}/>
                </View>
            </ImageBackground>
            {/* midle login view  change*/}
            <View style={styles.Inputcontainer}>
                <View style={{padding: scale(10)}}>
                    <Text style={{color:'#006C25', fontSize: scale(25)}}>Welcome</Text>
                    <Text style={{fontSize: scale(15)}}>To GreenBeauty's House</Text>
                </View>
                <View>
                        <Text style={{color:"#B6C7D1", fontSize:scale(12)}}>Email</Text>
                        <View style={styles.action}>
                            <FontAwesome name="user-o" color="#05375a" size = {scale(12)}/>
                            <TextInput style={styles.input} 
                            placeholder="your email"
                            keyboardType="email-address"
                            onChangeText={(val)=> textInputChange(val)}></TextInput>
                            {data.check_textinputchange ?
                            <Feather name='check-circle' color='green' size={scale(12)}/>
                            : null}
                        </View>
                        <Text style={{color:"#B6C7D1", fontSize:scale(12)}}>Password</Text>
                        <View style={styles.action}>
                            <Feather name="lock" color="#05375a" size = {scale(12)}/>
                            <TextInput style={styles.input}
                            placeholder="************"
                            keyboardType={'default'} 
                            secureTextEntry={data.securetextentry? true:false}
                            onChangeText={(val)=>hadlepwchange(val)}></TextInput>
                            <TouchableOpacity
                            onPress={updatesercuretext}>
                                {data.securetextentry ?
                                <Feather name='eye-off' color='gray' size={scale(12)}/>
                                :
                                <Feather name='eye' color='gray' size={scale(12)}/>
                                }
                            </TouchableOpacity>
                        </View>
                        
                    <TouchableOpacity style={styles.forgotPW}>
                        <Text style={{marginRight:scale(20), color:"#B6C7D1"}} >Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}
                onPress={()=>{loginHadle(data.email, data.password)}}>
                    <Text style={{color:"#FFF"}}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            {/*Bottom login view */}
            <View style={{alignItems:"center"}}>
                <View style={{flexDirection:"row", alignItems:"center", width:"60%"}}>
                    <View style={{ flex:1,height:1,borderWidth:0.25, borderColor:"#000"}}></View>
                    <Text style={{width: scale(40), textAlign:"center"}}>OR</Text>
                    <View style={{flex:1,height:1 ,borderWidth:0.25, borderColor:"#000"}}></View>
                </View>
                
                <TouchableOpacity style={styles.registercontainer} onPress={()=>{navigation.navigate('Register')}}>
                    <Text style={{color:"#039B52"}}>Register new account?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const heightofscreen = Dimensions.get('window').height
const widthofscreen = Dimensions.get('window').width
const styles = StyleSheet.create({
    action:{
        flexDirection: "row",
        marginTop: scale(5),
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
    },
    registercontainer:{
        alignItems:"center",
        justifyContent:"center",
        
    },
    input:{
        flex:1,
        paddingLeft: scale(15),
        color:"#B6C7D1",
        marginTop:scale(-15)
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
        bottom: scale(50),
        flexDirection:"column",
        backgroundColor:"#FFFFFF",
        marginLeft:30,
        marginRight:30,
        height: Dimensions.get('window').height/2,
        borderRadius:20,
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent:"space-between"
      },
    forgotPW:{
        height: scale(40),
        marginTop:10,
        flexDirection:"row-reverse",
    },
    button:{
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
export default LoginScreen