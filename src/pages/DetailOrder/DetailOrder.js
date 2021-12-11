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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductOrder from '../../components/DetailOrder/ProductOrder';
import { getDetailById, getDeliveryInformation } from '../../networking/Server';
const DetailOrder = ({navigation, route}) =>{
    const [delivery, setDelivery] = useState({
        receiveName: "loading",
        phone : "loading",
        fullAddress: "Loading"
    })
    const [product, setProduct] = useState([])
    useEffect(() => {
        const getData = () =>{
            getDeliveryInformation(route.params.order.delivery).then(result=>{
                setDelivery(result);
            });
            getDetailById(route.params.order.id).then(result=>{
                setProduct(result);
            })
        }
        getData();
    }, [])
    
    return(
        <View>
            <ScrollView>
                <View style={{flexDirection:"column", marginTop: 5, backgroundColor:"white"}}>
                    <View style={{flexDirection:"row", marginTop:5, marginLeft: 5}}>
                        <MaterialCommunityIcons name="truck-fast-outline" size={scale(15)} />
                        <Text style={{fontWeight:"700", marginLeft: 5}}>Thông tin vận chuyển</Text>
                    </View>
                    <Text style={{marginTop: 10, marginLeft: 5, marginBottom: 5}}>COD Nhanh</Text>
                </View>

                <View style={{flexDirection:"column", marginTop: 5, backgroundColor:"white"}}>
                    <View style={{flexDirection:"row", marginTop: 5, marginLeft: 5}}>
                        <Ionicons name="md-location-outline" size={scale(15)} />
                        <Text style={{fontWeight:"700", marginLeft: 5}}>Địa chỉ nhận hàng</Text>
                    </View>
                    <View style={{marginTop: 10, marginLeft: 20, marginBottom: 5}}>
                        <Text>{delivery.receiveName}</Text>
                        <Text>{delivery.phone}</Text>
                        <Text>{delivery.fullAddress}</Text>
                    </View>
                </View >

                <View style={{flexDirection:"column", marginTop: 5, backgroundColor:"white"}}>
                    {
                        product.map(item=>{
                            //console.log("id",item.id)
                            return(
                                <ProductOrder key={item.id} quanlity = {item.quantities} id ={item.product}/>
                            )
                        })
                    }
                    <View style={{marginTop: 5, marginLeft: 5, marginBottom: 5,flexDirection:"row", justifyContent:"space-between"}}>
                        <Text style={{fontWeight:"bold",  marginLeft: 5}}>Thành tiền</Text>
                        <Text style={{marginRight: 5}}>đ{route.params.order.totalValue}</Text>
                    </View>
                </View>

                <View style={{flexDirection:"column", marginTop: 5, backgroundColor:"white"}}>
                    <View style={{flexDirection:"row", marginTop: 5, marginLeft: 5}}>
                        <MaterialIcons name="attach-money" size={scale(15)} color="#F28244"/>
                        <Text style={{fontWeight:"700", marginLeft: 5}}>Phương thức thanh toán</Text>
                    </View>
                    <Text style={{marginTop: 10, marginLeft: 10, marginBottom: 5}}>Thanh toán khi nhận hàng</Text>
                </View >

                <View style={{flexDirection:"column", marginTop: 5, backgroundColor:"white"}}>
                    <View style={{flexDirection:"row", marginTop: 5, marginLeft: 5, justifyContent:"space-between"}}>
                        <Text style={{fontWeight:"700", marginLeft: 5}}>Mã đơn hàng</Text>
                        <Text style={{marginRight: 5}}>#{route.params.order.id}</Text>
                    </View>
                    
                    <View style={route.params.order.status==4? {flexDirection:"row", marginTop: 5, marginLeft: 5, justifyContent:"space-between"} : 
                {flexDirection:"row", marginTop: 5, marginLeft: 5, justifyContent:"space-between", marginBottom: 5}}>
                        <Text style={{marginLeft: 5}}>Thời gian đặt</Text>
                        <Text style={{marginRight: 5}}>{route.params.order.dateCreate}</Text>
                    </View>
                    
                    {
                        route.params.order.status==4?
                        <View style={{flexDirection:"row", marginTop: 5, marginLeft: 5, justifyContent:"space-between", marginBottom: 5}}>
                            <Text style={{marginLeft: 5}}>Thời gian nhận hàng</Text>
                            <Text style={{marginRight: 5}}>{route.params.order.dateReceive}</Text>
                        </View>
                        :
                        null
                    }
                </View>
            </ScrollView>
            <View style={{ width: "100%",alignItems:"center"}}>
                {
                    route.params.order.status==1?
                    <TouchableOpacity style={styles.Button}>
                        <Text>Hủy đơn hàng</Text>
                    </TouchableOpacity>
                    :
                    null
                }
                {
                    route.params.order.status==2?
                    <TouchableOpacity style={styles.Button}>
                        <Text>Đang vận chuyển</Text>
                    </TouchableOpacity>
                    :
                    null
                }
                {
                    route.params.order.status==3?
                    <TouchableOpacity style={styles.Button}>
                        <Text>Xem chi tiết</Text>
                    </TouchableOpacity>
                    :
                    null
                }
                {
                    route.params.order.status==4?
                    <TouchableOpacity style={styles.Button}
                    onPress={()=>{navigation.navigate('Rating',{detail: product})}}>
                        <Text>Đánh giá</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Button:{
        justifyContent:"center",
        alignContent: 'center',
        alignItems: "center",
        padding: scale(10),
        backgroundColor: "#FFF",
        borderRadius: scale(3),
        margin: scale(10),
        borderColor:"#14A445",
        borderWidth: 1,
        width: "40%",
      },
})
export default DetailOrder;