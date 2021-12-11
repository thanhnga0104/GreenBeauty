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
import {getProductById, getDetailById} from '../../networking/Server'
const StatusComponent = (props) =>{

  const [numberofProduct, setNumberofProduct] = useState(0)
  const [data, setData]= useState([])
  const [product, setProduct] = useState({
    imagepresent:"http://127.0.0.1:8000/media/media/logo.jpg",
    price:"Loading...",
    name: "Loading..."
  })
  useEffect(() => {

      const GetInfor = () =>
      {
        getDetailById(props.id).then(result=>{
          setNumberofProduct(Object.keys(result).length);
          setData(result);
          result.forEach(element => {
            getProductById(element.product).then(re=>{
              setProduct(re);
            })
          });
        })
      }
    GetInfor();
    },[])
    

  return(
    <View style={{flexDirection:"column", backgroundColor:"white", marginTop:10}}>
      <Text style={{margin:10}}>#{props.id}</Text>
        <View>
            <View style={{flexDirection:"row"}}>
            <Image style = {styles.Image} source={{uri : product.imagepresent.replace("127.0.0.1","10.0.2.2")}}/>
            <View style={{flexDirection:"column", justifyContent:"space-evenly"}}>
                <Text style={{margin:10}} ellipsizeMode="tail"
                numberOfLines= {2}>{product.name}</Text>
                <View style={{margin:10}}>
                  <Text style={{alignItems:"flex-end", color:"red", alignContent:"flex-end"}}>{product.price}</Text>
                </View>
                
            </View>
          </View>
          <View style={styles.line}></View>
        </View>
        <View>
          <View style={{flexDirection: "row", justifyContent:"space-between", marginLeft: 10, marginRight:10, marginTop:10}}>
            <Text>{numberofProduct} sản phẩm</Text>
            <View style={{flexDirection: "row"}}> 
              <Text>Tổng thanh toán: </Text>
              <Text style={{color:"red"}}>{props.total}</Text>
            </View>
          </View>
          <View style={styles.line1}></View>
        </View>
        

        <View style={{width:"100%", alignItems:"flex-end"}}>
          {props.status==1?
          <TouchableOpacity style={styles.Button}>
            <Text style={{color: "#000"}}>Đang xử lý</Text>
          </TouchableOpacity>
          :
          null
          }
          {
            props.status==2?
            <TouchableOpacity style={styles.Button}>
              <Text style={{color: "#000"}}>Đã xác nhận</Text>
            </TouchableOpacity>
            :
            null
          }
          {
            props.status==3?
            <TouchableOpacity style={styles.Button}>
              <Text style={{color: "#000"}}>Đã nhận được hàng</Text>
            </TouchableOpacity>
            :
            null
          }
          {
            props.status==4?
            <TouchableOpacity style={styles.Button}
            onPress={()=>{props.navigation.navigate('Rating',{detail: data})}}>
              <Text style={{color: "#000"}}>Đánh giá</Text>
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
    backgroundColor: "#14A445",
    borderRadius: scale(3),
    margin: scale(10),
    width: "40%"
  },
  line:{
    width: "100%",
    height: 0.5,
    backgroundColor:"#000",
    marginTop: 5
  },
  line1:{
    width: "100%",
    height: 0.5,
    backgroundColor:"#000",
    marginTop: 15
  },
  Image:{
    width: scale(70),
    height: scale(70),
    margin: 10,
  }
})
export default StatusComponent;
