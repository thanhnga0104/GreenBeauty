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
import Swipeout from 'react-native-swipeout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getImageFromServer} from '../../networking/Server';
import {getProductFromCart} from '../../networking/Server';
import {getProductById} from '../../networking/Server';
import {getDataUser} from '../../networking/Server';
import {getAddress} from '../../networking/Server';
import {putItemInCart} from '../../networking/Server';
import { deleteProductFromCart } from '../../networking/Server';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class CartFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      imageFromServer: [],
      productItem: [],
      quantity: null,

      activeRowKey: null,
    };
  }

  isSelect = event => {
    this.setState({isSelected: event});
  };

  componentDidMount() {
    this.fetchProductById();
    this.setQuantity();
  }

  fetchProductById = () => {
    let product_id = this.props.item.product;
    getProductById(product_id)
      .then(product => {
        this.refreshImageFromServer(product);
        this.setState({productItem: product});
      })
      .catch(error => {
        console.log('Lỗi tải ảnh trong giỏ hàng');
      });
  };

  refreshImageFromServer = product => {
    let data = product.images;
    data.forEach(data => {
      getImageFromServer(data)
        .then(imageData => {
          if (this.state.imageFromServer == '') {
            this.setState({imageFromServer: imageData});
          }
        })
        .catch(error => {
          this.setState({imageFromServer: []});
        });
    });
  };

  setQuantity = () => {
    this.setState({quantity: this.props.item.quantities});
  };
  //Khi bấm dấu + hoặc - thì filter trong Cart với user_id và product_id
  btnPlus() {
    getProductFromCart(this.props.userData.userID, this.state.productItem.id)
      .then(product => {
        product.forEach(_product => {
          putItemInCart('+', this.props.userData, _product)
            .then(item => {
              console.log('Đã cộng số lượng sản phẩm');
              this.setState({quantity: item.quantities});
            })
            .catch(error => {
              console.error(`Error is: ${error}`);
            });
        });
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  }

  btnSub = () => {
    getProductFromCart(this.props.userData.userID, this.state.productItem.id)
      .then(product => {
        product.forEach(_product => {
          putItemInCart('-', this.props.userData, _product)
            .then(item => {
              console.log('Đã trừ số lượng sản phẩm');
              this.setState({quantity: item.quantities});
            })
            .catch(error => {
              console.error(`Error is: ${error}`);
            });
        });
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  render() {
    const {navigation, item, handleSelect} = this.props;

    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) =>{
        if(this.state.activeRowKey != null){
          this.setState({activeRowKey: null})
        }

      },
      onOpen: (secId, rowId, direction) =>{
        this.setState({activeRowKey: this.props.item.id})

      },
      right:[
        {
          onPress: ()=> {
            deleteProductFromCart(this.state.activeRowKey)
            .then(()=>{              
              //console.log("xóa ok rồi")
              this.props.cartScreen.fetchProductFromCart();
            })
            .catch(error => {
              console.log("xóa ko dc")
            });
          },
          text:'Xóa', type:'delete'
        }
      ],
      rowId: this.props.index,
      sectionId: 1

    }
    return (
      <Swipeout {...swipeSettings}>
        <View style={styles.cartItem}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              tintColors={{true: 'green'}}
              value={this.state.isSelected}
              onValueChange={event => {
                handleSelect(event, this.state.productItem),
                  this.isSelect(event);
              }}
            />
          </View>

          <Image
            source={{uri: this.state.imageFromServer.img}}
            style={styles.itemImage}
          />
          <View style={{margin: 10}}>
            <Text style={styles.itemName}>{this.state.productItem.name}</Text>
            <Text style={styles.itemPrice}>{this.state.productItem.price}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{width: 20, borderWidth: 0.3, textAlign: 'center'}}
                onPress={() => this.btnSub()}>
                -
              </Text>
              <Text
                style={{
                  width: 40,
                  borderTopWidth: 0.3,
                  borderBottomWidth: 0.3,
                  textAlign: 'center',
                }}>
                {this.state.quantity}
              </Text>
              <TouchableOpacity onPress={() => this.btnPlus()}>
                <Text
                  style={{width: 20, borderWidth: 0.3, textAlign: 'center'}}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swipeout>
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
      listData: [],
      userData: null,
      selected: 0,
      selectData: [],
      deleteRowKey: null,
    };
  }

  componentDidMount() {
    this.fetchProductFromCart();
  }

  fetchProductFromCart = () => {
    getDataUser()
      .then(user => {
        getProductFromCart(user.userID, '')
          .then(items => {
            this.setState({listData: items, userData: user});
          })
          .catch(error => {
            this.setState({listData: []});
          });
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  handleSelect = (event, product) => {
    let listItem = this.state.selectData;
    if (event == true) {
      listItem.push(product.id);
      console.log('list item:', listItem);
      this.setState({
        selected: ++this.state.selected,
        selectData: listItem,
      });
    } else {
      let newList = listItem.filter(item => item !== product.id);
      console.log('list item:', newList);
      this.setState({
        selected: --this.state.selected,
        selectData: newList,
      });
    }
  };

  //Btn Mua Hàng
  btnBuyProduct(navigation) {
    if (this.state.selected > 0) {
      getAddress(this.state.userData, '')
        .then(data => {
          if (Object.keys(data).length === 0) {
            navigation.navigate('AddLocationScreen', {defaultAddress: 'true'});
            console.log('Chưa có địa chỉ');
          } else {
            navigation.navigate('ConfirmScreen', {
              selectData: this.state.selectData,
              userData: this.state.userData,
            });
            console.log('Đã có địa chỉ');
          }
        })
        .catch(error => {
          console.error(`Error is: ${error}`);
        });
    } else {
      alert('Chưa chọn sản phẩm');
    }
  }

  ItemSepatator = () => (
    <View
      style={{
        borderBottomWidth: 0.6,
        borderColor: '#E5E5E5',
      }}
    />
  );
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
          data={this.state.listData}
          keyExtractor={item => item.product}
          ListEmptyComponent={EmptyComponent}
          ItemSeparatorComponent={this.ItemSepatator}
          renderItem={({item, index}) => {
            return (
              <CartFlatListItem
              
                handleSelect={this.handleSelect}
                userData={this.state.userData}
                cartScreen={this}
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
              onPress={() => this.btnBuyProduct(navigation)}>
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
