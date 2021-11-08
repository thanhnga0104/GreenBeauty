import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ProductData} from '../../data/ProductData';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CartFlatListItem  ({navigation, item, handleSelect})  {
 
  const [isSelected, setSelection] = useState();
  return (
    <View style={styles.cartItem}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          tintColors={{true: 'green'}}
          value={isSelected}
          onValueChange={
            
            event=>{
             
              console.log("có chạy vô event")
              handleSelect(event),
              setSelection(!isSelected)
              
            }
            

          
          }
            
        
        />
      </View>

      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={{padding: 10}}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{width: 20, borderWidth: 0.3, textAlign: 'center'}}>
            -
          </Text>
          <Text
            style={{
              width: 40,
              borderTopWidth: 0.3,
              borderBottomWidth: 0.3,
              textAlign: 'center',
            }}>
            1
          </Text>
          <Text style={{width: 20, borderWidth: 0.3, textAlign: 'center'}}>
            +
          </Text>
        </View>
      </View>
    </View>
  );
};

export default class CartScreen extends Component {
  constructor() {
    super();
    this.state = {
      selected: 0
    };
  }
  handleSelect=(event)=> {
    if (event == true) {
      console.log("có chạy vô true")
      this.setState({
       
        selected: ++this.state.selected,
        
      });
    } else {
      console.log("có chạy vô false")
      this.setState({
        selected: --this.state.selected,
        
      });
    }
  }

  btnMuaHang(navigation) {
    console.log('số lượng selected: ', this.state.selected)
    if (this.state.selected > 0) {
      navigation.navigate('Thanh Toán');
    } else {
      console.log('chưa chọn sp', this.state.selected);
      alert('Chưa chọn sản phẩm');
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View style={styles.headerContainer}>
          <View style={styles.backContainer}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>

          <View>
            <Text
              style={{
                flex: 1,
                color: '#fff',
                marginLeft: 8,
                fontSize: 16,
                fontWeight: '600',
                textAlignVertical: 'center',
              }}>
              Giỏ hàng
            </Text>
          </View>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={ProductData}
          renderItem={({item, index}) => {
            return (
              <CartFlatListItem
                handleSelect={this.handleSelect}
                navigation={navigation}
                item={item}
                index={index}></CartFlatListItem>
            );
          }}></FlatList>

        <View
          style={{
            width: windowWidth,
            backgroundColor: '#fff',
            height: 50,
            flexDirection: 'row',
            borderWidth: 0.3,
            justifyContent: 'space-between',
          }}>
          <Text>Tất cả</Text>

          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // width: windowWidth / 2,
              }}>
              <Text style={{color: '#484848', marginHorizontal: 5}}>
                Tổng tiền
              </Text>
              <Text style={{color: 'green', marginRight: 5}}>200.000</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              // onPress={()=> {navigation.navigate('Thanh Toán');}}
              onPress={() => this.btnMuaHang(navigation)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  textAlign: 'center',
                  paddingHorizontal: 10,
                }}>
                Mua hàng(1)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#316C49',
  },

  backContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxContainer: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  itemImage: {
    margin: 10,
    width: 80,
    height: 80,
  },
  itemName: {
    fontSize: 14,
    color: '#484848',
    marginVertical: 4,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5F04',
  },
});
