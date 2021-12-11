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
  FlatList,
  VirtualizedList
} from 'react-native';
import {scale} from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import StatusComponent from '../../components/OrderStatus/Statuscomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Delivery = ({navigation, route}) => {
    const [renderData,setRenderData] = useState([]) 

    useEffect(() => {

        const getData = async () => {
            try {

              const valueid = await AsyncStorage.getItem('id')

              GetData(valueid);

              if(value !== null) {
              }
            } catch(e) {
                //alert("no data")
            }
          }
          const GetData = async(id)=>
          {
              await fetch ('http://10.0.2.2:8000/order/?user='+ id + '&status=3',
          {
              method:'GET',
              headers:{
                  'Content-Type': 'application/json'
              },
          }).then(response=>{
              if(response.status==200)
              {
                  response.json().then(d=>{
                      //console.log("status:"+sta+" ", Object.keys(d).length)
                      setRenderData(d);
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
    },[])

    return(
        <FlatList
        data={renderData}
        renderItem={({item})=>{
        return(
            <TouchableOpacity
            onPress={()=>navigation.navigate("DetailOrder",{order: item})}>
                <StatusComponent id={item.id} total={item.totalValue} status={item.status}/>
            </TouchableOpacity>
        )
        }}
        keyExtractor={(item) => item.id}/>
    )
}


const styles = StyleSheet.create({

});

export default Delivery;