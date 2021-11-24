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
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ProductData} from '../../data/ProductData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getImageFromServer} from '../../networking/Server';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class CartFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      imageFromServer: [],
    };
  }

  isSelect = event => {
    this.setState({isSelected: event});
  };

  componentDidMount() {
    this.refreshImageFromServer();
  }

  refreshImageFromServer = () => {
    let data = this.props.item.images;
    data.forEach(data => {
      getImageFromServer(data)
        .then(image => {
          if (this.state.imageFromServer == '') {
            this.setState({imageFromServer: image});
          }
        })
        .catch(error => {
          this.setState({imageFromServer: []});
        });
    });
  };

  render() {
    const {navigation, item, handleSelect} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View style={styles.cartItem}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              tintColors={{true: 'green'}}
              value={this.state.isSelected}
              onValueChange={event => {
                handleSelect(event), this.isSelect(event);
              }}
            />
          </View>

          <Image
            source={{uri: this.state.imageFromServer.img}}
            style={styles.itemImage}
          />
          <View style={{margin: 10}}>
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
                {item.quantity}
              </Text>
              <Text style={{width: 20, borderWidth: 0.3, textAlign: 'center'}}>
                +
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const EmptyComponent = () => {
  return (
    <View>
      <Text>Chưa có dữ liệu đâu </Text>
    </View>
  );
};

export default class CartScreen extends Component {
  constructor() {
    super();
    this.state = {
      selected: 0,
    };
  }
  handleSelect = event => {
    if (event == true) {
      this.setState({
        selected: ++this.state.selected,
      });
    } else {
      this.setState({
        selected: --this.state.selected,
      });
    }
  };

  btnMuaHang(navigation) {
    
    if (this.state.selected > 0) {
      // navigation.navigate('PaymentScreen');
      // navigation.navigate('AddressReceiveScreen');
      navigation.navigate('LocationScreen');
     
    } else {
    
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
        <StatusBar backgroundColor="#316C49" barStyle="light-content" />
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
          keyExtractor={item => item.id}
          ListEmptyComponent={EmptyComponent}
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
              }}>
              <Text style={{color: '#484848', marginHorizontal: 5}}>
                Tổng tiền
              </Text>
              <Text style={{color: 'green', marginRight: 5}}>0</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => this.btnMuaHang(navigation)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  textAlign: 'center',
                  paddingHorizontal: 10,
                }}>
                Mua hàng({this.state.selected})
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
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  itemImage: {
    marginVertical: 10,
    width: 80,
    height: 80,
  },
  itemName: {
    width: windowWidth * 0.7,
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
