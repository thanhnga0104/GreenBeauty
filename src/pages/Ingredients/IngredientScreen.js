import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IngredientComponent from '../../components/Ingredients/ingredients';
import {scale} from 'react-native-size-matters'
import PieChart from 'react-native-pie-chart';

class IngredientsScreen extends React.Component{
    constructor(props)
    {
      super(props);
      this.state={
        safe: 0,
        medium: 0,
        unsafe: 0, 
        nottest: 1,
        inputtext: "",
        ResponseData:[],
      }
      this.handleTextchange = this.handleTextchange.bind(this)
      this.handlegetApi = this.handlegetApi.bind(this)
      this.handlesplitstring = this.handlesplitstring.bind(this)
      this.handleReset = this.handleReset.bind(this)
    }
    handleReset(){
      this.setState({
        ResponseData: null
      })
      
    }
    handleTextchange(newtext)
    {
      this.setState({
        inputtext: newtext,
        ResponseData: [],
        safe: 0,
        medium: 0,
        unsafe: 0,
        nottest: 1,
      })
    }
    handlesplitstring(input)
    {
      const arr = input.split(',');
      for(let i=0; i < arr.length; i++ )
      {
        arr[i] = this.convertToSlug(arr[i])
        this.handlegetApi(arr[i])
      }
    }
    
    handlegetApi = async (input) =>
    {
      const arrtmp = this.state.ResponseData
      fetch ('http://10.0.2.2:8000/ingredient/'+ input +'/',
          {
              method:'GET',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
          }).then(response=>{
              if(response.status==200)
              {
                  response.json().then(data=>{
                      arrtmp.push(data)
                      this.setState({
                        ResponseData: arrtmp,
                      })
                      console.log("level: ", data.levelOfSave)
                      
                      if(data.levelOfSave >= 4)
                      {
                        this.setState({safe: this.state.safe + 1, nottest: 0})
                      }
                      else if(data.levelOfSave==3)
                      {
                        this.setState({medium: this.state.medium + 1, nottest: 0})
                      }
                      else
                      {
                        this.setState({unsafe: this.state.unsafe + 1, nottest: 0})
                      }
                  })
              }
          })
          .then(res => {
              console.log("reponse :", res);
             })
             .catch(error => {
              console.error("eroor",error);
              return { name: "network error", description: "" };
            });
    }
   convertToSlug = (Text)=>
    {
      return Text
          .trim()
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'');
    }
    
    render()
    
      {return(
        <SafeAreaView style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.inputarea}>
              <>
                <TextInput style={styles.inputingredients}
                  multiline={true}
                  size={scale(20)}
                  placeholder= "Enter the ingredients, each ingredient has ',' between"
                  placeholderTextColor="#000000"
                  onChangeText={this.handleTextchange}/>
              </>
              <TouchableOpacity style={{justifyContent:"center"}} 
                onPress={()=>{
                  this.handlesplitstring(this.state.inputtext)
                  }}>
                <Icon name="search" size={scale(20)} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{fontSize: 20, marginLeft: scale(10), fontFamily: "Cochin"}}>Tổng quan:</Text>
         
          <View style={styles.piecontainer}>
              <PieChart
                widthAndHeight={widthAndHeight}
                series={[this.state.unsafe,this.state.medium,this.state.safe,this.state.nottest]}
                sliceColor={sliceColor}
              />
              <View style={{flexDirection:"column", justifyContent:"space-between"}}>
                  <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <View style={{backgroundColor:"#D7375E", width: scale(20), height: scale(20)}}></View>
                    <Text style={{marginLeft:scale(10)}}>Chất không an toàn:</Text>
                    <Text style={{marginLeft:scale(10)}}>{this.state.unsafe}</Text>
                  </View>
                  <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <View style={{backgroundColor:"#C7CB14", width: scale(20), height: scale(20)}}></View>
                    <Text style={{marginLeft:scale(10)}}>Chất an toàn:            </Text>
                    <Text style={{marginLeft:scale(10)}}>{this.state.medium}</Text>
                  </View>
                  <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <View style={{backgroundColor:"#1627D0", width: scale(20), height: scale(20)}}></View>
                    <Text style={{marginLeft:scale(10)}}>Chất rất an toàn:      </Text>
                    <Text style={{marginLeft:scale(10)}}>{this.state.safe}</Text>
                  </View>
                  <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <View style={{backgroundColor:"#00EE00", width: scale(20), height: scale(20)}}></View>
                    <Text style={{marginLeft:scale(10)}}>Chưa kiểm tra             </Text>
                    <Text> </Text>
                  </View>
              </View>
          </View>
          <Text style={{fontSize: 20, marginLeft: scale(10), fontFamily: "Cochin"}}>Chi tiết:</Text>
          <FlatList
          data={this.state.ResponseData}
          renderItem={({item})=>{
            return(<IngredientComponent level={item.levelOfSave} name={item.name} content={item.Description}/>)
          }}
          keyExtractor={(item) => item.id}
          ></FlatList> 
  
      </SafeAreaView>
      )
   }
}
const widthAndHeight = scale(150) 
const sliceColor = ['#D7375E','#C7CB14','#1627D0','#00EE00']
const heightwin =  Dimensions.get("window").height
const widthwin =  Dimensions.get("window").width
const styles = StyleSheet.create({
  pie:{
    paddingVertical: 15,
    flexDirection: 'row',
    width: 350,
    justifyContent: 'space-between',
  },
  piecontainer:{
    height: heightwin/4,
    flexDirection: "row",
    justifyContent:"space-evenly",
    marginTop: scale(10)
  },
  container: {
    flex: 1,
  },
  container1:{
    flexDirection:"row",
  },
  inputarea:{
    flexDirection:"row",
  },
  inputingredients:{
    height: heightwin*0.3,
    width: widthwin*0.8,
    backgroundColor:"#D8D8D8",
    margin: widthwin*0.05,
    borderRadius: 26,
    shadowOffset: {
      width: 0,
      height: 2,
        },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 5,
    color:"#000"
  },
  square:{
    height: scale(1),
    width: scale(1)
  }
});
export default IngredientsScreen