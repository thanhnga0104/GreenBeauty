import React, {useState} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo'
import CheckBox from '@react-native-community/checkbox';

const SettingAccount =({navigator})=>
{
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [birthdaytext, setbirthdaytext]= useState('01/01/2000');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tem = new Date(currentDate);
        let fDate= tem.getDate()+ '/'+tem.getMonth()+'/'+tem.getFullYear();
        setbirthdaytext(fDate);
      };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    const [male, setmale]=useState(false);
    const [female, setfemale]=useState(false);
    const onCheckMaleChange = ()=>{
        if(male)
        {
            setmale(false);
            setfemale(true);
        }
        else
        {
            setmale(true);
            setfemale(false);
        }
    }
    const onCheckFemaleChange =()=>
    {
        if(female)
        {
            setfemale(false);
            setmale(true);
        }
        else
        {
            setfemale(true);
            setmale(false);
        }
    }
    return(
        <View style={{flex:1, justifyContent:"space-evenly"}}>
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-back" size={scale(27)} color="#FFF"/>
                    </TouchableOpacity>

                    <View style={styles.containeravt}>
                        <Avatar.Image size={scale(widthofscreen/6.5)} source={require("../../../assets/image/star.jpg")}/>
                        <TouchableOpacity style={styles.camera}>
                            <Icon name="camera" size={scale(12)}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <View style={{justifyContent:"center", alignItems:"center",}}>
                        <Text style={{marginBottom:scale(20),marginTop: scale(10) ,fontSize:scale(20)}}>Thông tin tài khoản</Text>
                    </View>

                    <View>
                        <Text style={{marginLeft:scale(10), fontSize:scale(10)}} >Họ tên</Text>
                        <TextInput style={styles.input}
                            defaultValue="Duy Lâm">
                        </TextInput>
                    </View>

                    <View style={{marginTop:10}}>
                        <Text style={{marginLeft:scale(10), fontSize:scale(10)}} >Số điện thoại</Text>
                        <TextInput style={styles.input}
                            defaultValue="090010001"
                            keyboardType="numeric">
                        </TextInput>
                    </View>

                    <View style={{marginTop:10, borderBottomWidth:0.5,marginLeft:scale(10), marginRight:scale(10)}}>
                        <Text style={{fontSize:scale(10),}} size={scale(10)}>Ngày sinh</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingTop:scale(10),paddingBottom:scale(10)}}>
                            <Text>{birthdaytext}</Text>
                            <TouchableOpacity 
                                onPress={()=>showMode('date')}
                                >
                                <Fontisto name="date" size={scale(20)}/>
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
                    
                    <View style={{flexDirection:"column", marginLeft:scale(10), marginTop:scale(10)}}>
                        <Text style={{fontSize:scale(10)}}>Giới tính:</Text>
                        <View style={{flexDirection:"row", marginTop:scale(5)}}>
                            <View style={{flexDirection:"row",justifyContent:"center", alignItems:"center"}}>
                                <CheckBox disabled={false} 
                                value={male}
                                onValueChange={()=>onCheckMaleChange()}/>

                                <Text style={{marginLeft:scale(5), }}>Nam</Text>
                            </View>

                            <View style={{flexDirection:"row",justifyContent:"center", alignItems:"center", marginLeft:scale(10)}}>
                                <CheckBox disabled={false} 
                                value={female}
                                onValueChange={()=>onCheckFemaleChange()}/>

                                <Text style={{marginLeft:scale(5), }}>Nữ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            
                <View style={styles.setting}>
                    <TouchableOpacity style={styles.itemsetting}>
                        <Text style={{fontSize: scale(17), fontWeight: '300', marginLeft: scale(10)}}>Đổi mật khẩu</Text>
                        <Entypo name="chevron-small-right" size={scale(24)} style={{marginLeft: scale(10)}} />
                    </TouchableOpacity>                     

                </View>
            </ScrollView>
            <View style={{alignItems:"center", justifyContent:"center", marginBottom:scale(5)}}>
                <TouchableOpacity style={styles.buttoncontainer}>
                    <Text style={{fontSize: scale(17), fontWeight: '300', color:"#FFF"}}>Cập nhật thay đổi</Text>
                </TouchableOpacity>   
            </View>

        </View>
    )
}

const heightofscreen = Dimensions.get('window').height
const widthofscreen = Dimensions.get('window').width
const styles= StyleSheet.create({
    buttoncontainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width: "70%",
        backgroundColor:"#93F48A",
        borderRadius: scale(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        height:heightofscreen/20,
    },
    setting:{
        flexDirection:"column",
    },  
    itemsetting:{
        flexDirection:"row",
        marginTop: scale(10),
        borderBottomWidth: 0.2,
        paddingBottom: scale(10),
        justifyContent:"space-between"
    },
    container:{
        width: widthofscreen,
        height: scale(heightofscreen/6),
        backgroundColor:"#93F48A",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection:"column",
    },
    containeravt:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    camera:{
        height:scale(20),
        width: scale(20),
        borderRadius:scale(20),
        backgroundColor:"#FFF",
        alignItems:"center",
        justifyContent:"center",
        bottom: scale(20),
        left:scale(20),
        borderColor:"#000",
        borderWidth:0.5,
    },
    input:{
        borderBottomWidth: 0.5,
        color:"#B6C7D1",
        marginLeft: scale(10),
        marginRight:scale(10),
    },
})
export default SettingAccount