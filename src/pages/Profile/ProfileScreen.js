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
import CheckBox from '@react-native-community/checkbox';
import {scale} from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Avatar } from 'react-native-paper';
import { AuthContext } from '../../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = ({navigation})=>{

    const { signOut } = React.useContext(AuthContext);
    const [data, setData] = useState({
        name: "Loading...",
        id: "",
        avt: "http://127.0.0.1:8000/media/logo-uit.png",
        phonenum: "loading...",
        token: "" 
    })
    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('userToken')
              const valueid = await AsyncStorage.getItem('id')
              console.log("value: ", value)

              getInfo(valueid, value);
              if(value !== null) {
              }
            } catch(e) {
                alert("no data")
            }
          }
        const getInfo = async (id, token) => {
            console.log("token: ", 'Bearer '+ token)
            await fetch ('http://10.0.2.2:8000/user/'+ id + '/',
        {
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
            },
        }).then(response=>{
            if(response.status==200)
            {
                response.json().then(d=>{
                    console.log("name: ", d.name)
                    setData({
                        ...data,
                        name: d.name,
                        phonenum: d.phone,
                        avt: d.avt
                    })
                })
            }
        })
        .then(res => {
            //console.log("reponse :", res); 
           }).catch(error => {
            console.error("eroor",error);
            return { name: "network error", description: "" };
          });
        }
        getData();
    }, [])


    return(
        <View style={{flex:1}}>
            <ScrollView style={{ backgroundColor:"#EEEEEE"}}>
            <View style={styles.container}>
                <View style={{ marginLeft:scale(widthofscreen/15),flexDirection:"row"}}>
                    
                    <View style={{justifyContent:"center",}}>
                        <Avatar.Image style={{backgroundColor:"#FFF"}} size={scale(widthofscreen/6.5)}  source={{uri : data.avt.replace("127.0.0.1","10.0.2.2")}}/>
                    </View>
                      
                    <View style={{flexDirection:"column", justifyContent:"center", marginLeft: scale(10)}}>
                        <Text style={{fontSize:scale(20),fontWeight:"bold", color:"#FFF"}}>{data.name}</Text>
                        <Text style={{fontSize:scale(15),fontWeight:"600", color:"#FFF"}}>{data.phonenum}</Text>
                    </View> 
                </View>
                
                
                <View style={{justifyContent:"flex-start", marginTop: scale(10), marginRight: scale(5)}}>
                    <Feather name="settings" color="#FFF" size={scale(24)}/>
                </View>

            </View>

            <View style={styles.purchased}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent:"center",}}>
                    <MaterialIcons name="receipt-long" size={scale(35)} color="#B2A7AA"/>
                    <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Chờ xác nhận</Text>
                    <Text style={{fontSize: scale(7), fontWeight: 'bold'}}>(1)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems: 'center', justifyContent:"center"}}>
                    <MaterialIcons name="storefront" size={scale(35)} color="#B2A7AA"/>
                    <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Chờ lấy hàng</Text>
                    <Text style={{fontSize: scale(7), fontWeight: 'bold'}}>(1)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems: 'center', justifyContent:"center", }}>
                    <MaterialCommunityIcons name="truck-outline" size={scale(35)} color="#B2A7AA"/>
                    <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Đang giao</Text>
                    <Text style={{fontSize: scale(7), fontWeight: 'bold'}}>(1)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center', justifyContent:"center", }}>
                    <MaterialIcons name="star-outline" size={scale(35)} color="#B2A7AA"/>
                    <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Đánh giá</Text>
                    <Text style={{fontSize: scale(7), fontWeight: 'bold'}}>(1)</Text>
                </TouchableOpacity>
            </View>
        
            <View style={styles.setting}>
                <TouchableOpacity style={styles.itemsetting}>
                    <Icon name="heart-o" size={scale(24)} style={{marginLeft: scale(10)}} color="#FC7676"/>
                    <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Đã thích</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemsetting}>
                    <MaterialIcons name="star-outline" size={scale(24)} style={{marginLeft: scale(10)}} color="#F2F479"/>
                    <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Đánh giá sản phẩm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemsetting}>
                    <MaterialCommunityIcons name="shopping-outline" size={scale(24)} style={{marginLeft: scale(10)}} color="#FFAC7D"/>
                    <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Giỏ hàng</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemsetting1}>
                    <MaterialCommunityIcons name="gift-outline" size={scale(24)} style={{marginLeft: scale(10)}} color="#69E16E"/>
                    <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Kho quà tặng</Text>
                </TouchableOpacity>
            </View>
        
            <View style={styles.setting}>
                <TouchableOpacity style={styles.itemsetting} onPress={()=>{navigation.navigate('SettingAccount')}}>
                    <MaterialCommunityIcons name="account-outline" size={scale(24)} style={{marginLeft: scale(10)}} color="#231F20"/>
                    <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Cài đặt tài khoản</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemsetting}>
                    <Feather name="message-square" size={scale(24)} style={{marginLeft: scale(10)}} color="#FFAC7D"/>
                    <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Trò chuyện với GreenBeauty</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemsetting1}>
                    <Feather name="phone-call" size={scale(24)} style={{marginLeft: scale(10)}} color="#69E16E"/>
                    <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Gọi cho chúng tôi</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.setting}>
                <TouchableOpacity style={styles.itemsetting}
                onPress={()=>{signOut()}}>
                    <MaterialIcons name="logout" size={scale(24)} style={{marginLeft: scale(10)}} color="#231F20"/>
                    <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
        
    );
}
const heightofscreen = Dimensions.get('window').height
const widthofscreen = Dimensions.get('window').width
const styles = StyleSheet.create({
    container:{
        width: widthofscreen,
        height: scale(heightofscreen/6),
        backgroundColor:"#93F48A",
        borderBottomLeftRadius:scale(30),
        borderBottomRightRadius: scale(30),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    avt:{
        height: scale(widthofscreen/5),
        width: scale(widthofscreen/5),
        borderRadius: scale(widthofscreen/5),
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },
    purchased:{
        height: heightofscreen/7,
        borderRadius: scale(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 16,
        marginTop:scale(30),
        marginRight: scale(10),
        marginLeft: scale(10),
        backgroundColor:"#FFFFFF",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    setting:{
        borderRadius: scale(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 16,
        marginTop:scale(30),
        marginRight: scale(10),
        marginLeft: scale(10),
        backgroundColor:"#FFFFFF",
        flexDirection:"column",
    },  
    itemsetting:{
        flexDirection:"row",
        marginTop: scale(10),
        borderBottomWidth: 0.2,
        paddingBottom: scale(10),
    },
    itemsetting1:{
        flexDirection:"row",
        marginVertical: scale(10),
        marginTop: scale(10),
    },
})
export default ProfileScreen;