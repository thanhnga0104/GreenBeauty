import React, {useState, useEffect} from 'react';

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  FlatList
} from 'react-native';

const BannerComponent = () => {
    const [listBanner, setListBanner] = useState([]);
    const [imgActive, setimgActive] = useState(0)
  
    useEffect(() => {
      GetData(); 
    }, [])
    const GetData = () =>{
      getBanner().then(re=>{
        setListBanner(re)
      })
    }
    async function getBanner() {
      const apiGetBanner =
        'http://10.0.2.2:8000/banner/';
      try {
        let response = await fetch(apiGetBanner, {
          method: 'GET',
        });
        let responseJson = await response.json();
        console.log("responseJson detail", responseJson)
        console.log("banner:", responseJson)
        return responseJson;
      } catch (error) {
        console.error(`Error is: ${error}`);
      }
    }
  
    const onChange = (event) =>{
      if(event) {
        const slide = Math.ceil(event.contentOffset.x/ event.layoutMeasurement.width);
        if(slide!= imgActive)
        {
          setimgActive(slide)
        }
      }
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.wrapper}>
            <FlatList
              onScroll={({nativeEvent}) => onChange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrapper}
              data={listBanner}
              renderItem={({item})=>{
                return(
                  <Image
                  resizeMode='stretch'
                  style={styles.wrapper}
                  source={{uri : item.image.replace("127.0.0.1","10.0.2.2")}}
                  />
                )
              }}
              keyExtractor={(item) => item.id}        
            />
  
            <View style={styles.Dotwrap}>
                {
                  listBanner.map((e,index) =>
                    <Text
                    key={index}
                    style={imgActive == index ? styles.doActive : styles.dot}
                    >●</Text>
                  )
                }
            </View>
        </View>
      </SafeAreaView>

  );
};
const WID = Dimensions.get("window").width;
const HEI = Dimensions.get("window").height;
const styles = StyleSheet.create({
  wrapper:{
    width: WID,
    height: HEI *0.2,
  },
  Dotwrap:{
    position:"absolute",
    bottom: 0,
    flexDirection:"row",
    alignSelf:"center"
  },
  doActive:{
    margin: 3,
    color:"black",
  },
  dot:{
    margin:3,
    color:"white"
  }
});

export default BannerComponent;