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
import { getProductById } from '../../networking/Server';
const ProductOrder = (props) =>{

    const [product, setProduct] = useState({
        imagepresent: "http://127.0.0.1:8000/media/logo-uit.png",
        name: "loading",
        price: "loading"
    })
    const imagepresent = "http://127.0.0.1:8000/media/logo-uit.png"
    useEffect(() => {
        const getData = () =>{
            getProductById(props.id).then(result=>{
                setProduct(result);
            });
        }
        getData();
    }, [])
    return(
        <View>
            <View style={{flexDirection:"row"}}>
            <Image style = {styles.Image} source={{uri : product.imagepresent.replace("127.0.0.1","10.0.2.2")}}/>
            <View style={{flexDirection:"column", justifyContent:"space-evenly"}}>
                <Text style={{margin:10}} ellipsizeMode="tail"
                numberOfLines= {2}>{product.name}</Text>
                <View style={{margin:10, flexDirection:"column",}}>
                  <Text style={{marginLeft: 5}}>x{props.quanlity}</Text>
                  <Text style={{color:"red", marginLeft:5}}>{product.price}</Text>
                </View>
            </View>
          </View>
          <View style={styles.line}></View>
        </View>
    )

}
const styles = StyleSheet.create({
    Image:{
        width: scale(70),
        height: scale(70),
        margin: 10,
      },
      line:{
        width: "100%",
        height: 0.5,
        backgroundColor:"#000",
        marginTop: 5
      },
})
export default ProductOrder;