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
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {getDataUser, getProductFromCart} from '../../networking/Server';
import {getAddress} from '../../networking/Server';
import {getProductById} from '../../networking/Server';
import {postOrder} from '../../networking/Server';
import {postOrderDetail} from '../../networking/Server';
import {deleteProductFromCart} from '../../networking/Server';

export default class ConfirmScreen extends Component {
  constructor() {
    super();
    this.state = {
      userData: '',
      delivery: [],
      provisional: 0,
      discount: 0,
      feeShip: 0,
      total: 0,
      order_id: -1,
      orderdetail: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    getDataUser()
      .then(user => {
        getAddress(user, 1).then(address => {
          address.forEach(_address => {
            this.setState({userData: user, delivery: _address});
          });
        });
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  ItemSepatator = () => (
    <View
      style={{
        borderBottomWidth: 0.6,
        borderColor: '#E5E5E5',
      }}
    />
  );

  //Tạm tính: provisional
  function_provisional = value => {
    let temp = this.state.provisional + value;
    this.setState({provisional: temp});
    this.function_total();
  };

  function_total = () => {
    let tempTotal =
      this.state.provisional - this.state.discount + this.state.feeShip;
    this.setState({total: tempTotal});
  };

  btnConfirmOder = navigation => {
    postOrder(this.state.userData, this.state.total, this.state.delivery.id)
      .then(result => {
        this.state.orderdetail.forEach(item => {
          postOrderDetail(result.id, item.product_id, item.quantity)
            .then(res => {
              this.setState({order_id: result.id});
            })
            .catch(error => {
              console.error(`Error is: ${error}`);
            });
        });

        this.props.route.params.selectData.forEach(product_id => {
          getProductFromCart(this.state.userData.userID, product_id)
            .then(cartItem => {
              console.log('cart id nè:', cartItem[0].id);
              deleteProductFromCart(cartItem[0].id)
                .then(() => {
                  console.log(
                    'Đặt hàng thành công, đã xóa sản phẩm vừa mua khỏi giỏ hàng',
                  );
                })
                .catch(error => {
                  console.log(
                    'Đặt hàng ko thành công, list product in cart còn nguyên',
                  );
                });
            })
            .catch(error => {
              console.log('Lỗi tại dòng 112 ConfirmScreen');
            });
        });

        navigation.navigate('OrderSuccessfullScreen');
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  function_OrderDetail = (product_id, quantity) => {
    let item = {product_id, quantity};
    let temp = this.state.orderdetail;
    temp.push(item);
    // console.log('temp: ', temp);
    this.setState({orderdetail: temp});
  };

  func = () => {
    let temp = this.state.order_id;
    return temp;
  };

  render() {
    const {navigation} = this.props;
    // console.log("select data:", this.props.route.params.selectData)
    return (
      <SafeAreaView style={{flex: 1, height: '100%'}}>
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
            <Text style={styles.titleHeader}>Xác nhận</Text>
          </View>
        </View>

        {/* bắt đầu body */}
        <ScrollView>
          <View style={{backgroundColor: '#fff'}}>
            <TouchableOpacity
              style={styles.childContainer}
              onPress={() => {
                navigation.navigate('AddressScreen');
              }}>
              <Text style={styles.titleComponent}>Địa chỉ nhận hàng</Text>

              <View style={{flexDirection: 'row'}}>
                <View style={{width: width / 1.1}}>
                  {/* <Text>Nhà riêng, cơ quan</Text> */}
                  <Text>{this.state.delivery.receiveName}</Text>
                  <Text>{this.state.delivery.phone}</Text>
                  <Text>{this.state.delivery.fullAddress}</Text>
                </View>

                <View style={styles.rightContainer}>
                  <EvilIcons name="chevron-right" size={30} color="black" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.spaceContainer}></View>
            <View style={styles.childContainer}>
              <Text style={styles.titleComponent}>Phương thức thanh toán</Text>
              <Text>Ở đây hiển thị phương thức thanh toán</Text>
            </View>
            <View style={styles.spaceContainer}></View>
            <View style={styles.childContainer}>
              <Text style={styles.titleComponent}>Thông tin đơn hàng</Text>
              <FlatList
                data={this.props.route.params.selectData}
                ItemSeparatorComponent={this.ItemSepatator}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  return (
                    <ProductItem
                      navigation={navigation}
                      provisional={this.function_provisional}
                      orderDetail={this.function_OrderDetail}
                      item={item}
                      index={index}></ProductItem>
                  );
                }}
              />
            </View>
            <View style={styles.spaceContainer}></View>
            <View>
              <TextInput placeholder="Nhập ghi chú (Nếu có)"></TextInput>
            </View>
            <View style={styles.childContainer}>
              <Text>Tạm tính: {this.state.provisional}</Text>
              <Text>Giảm giá</Text>
              <Text>Phí vận chuyển</Text>
              <Text>Thành tiền: {this.state.total}</Text>
            </View>

            <View style={styles.addCartContainer}>
              <TouchableOpacity
                style={styles.addCartButton}
                onPress={() => this.btnConfirmOder(navigation)}>
                <Text style={styles.addCartText}>Đặt hàng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      //imageFromServer: [],
      quantity: 0,
    };
  }

  componentDidMount() {
    this.fetchDataProduct();
    // this.fetchDataQuantity();
  }

  fetchDataProduct = () => {
    getProductById(this.props.item).then(product => {
      this.setState({product: product});
      // let data = product.images;
      // data.forEach(data => {
      //   getImageFromServer(data)
      //     .then(image => {
      //       // if (this.state.imageFromServer == '') {
      //       //   this.setState({imageFromServer: image, product: product});
      //       // }

      //       this.setState({product: product})
      //     })
      //     .catch(error => {
      //       //this.setState({imageFromServer: []});
      //     });
      // });

      ////////////////////
      getDataUser()
        .then(user => {
          getProductFromCart(user.userID, this.props.item)
            .then(items => {
              let temp = product.price * items[0].quantities;
              this.props.provisional(temp);

              this.props.orderDetail(product.id, items[0].quantities);

              this.setState({quantity: items[0].quantities});
            })
            .catch(error => {
              console.error(`Error is: ${error}`);
            });
        })
        .catch(error => {
          console.error(`Error is: ${error}`);
        });
    });
  };

  fetchDataQuantity = () => {
    getDataUser()
      .then(user => {
        getProductFromCart(user.userID, this.props.item)
          .then(items => {
            this.setState({quantity: items[0].quantities});
          })
          .catch(error => {
            console.error(`Error is: ${error}`);
          });
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  // refreshImageFromServer = () => {
  //   let data = this.props.item.images;
  //   data.forEach(data => {
  //     getImageFromServer(data)
  //       .then(image => {
  //         if (this.state.imageFromServer == '') {
  //           this.setState({imageFromServer: image});
  //         }
  //       })
  //       .catch(error => {
  //         this.setState({imageFromServer: []});
  //       });
  //   });
  // };
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          style={styles.cartItem}
          onPress={() => {
            navigation.navigate('DetailScreen', {
              //image: this.state.imageFromServer.img,
              product: this.props.item,
            });
          }}>
          <Image
            source={{uri: this.state.product.imagepresent}}
            style={styles.itemImage}
          />
          <View style={{margin: 10}}>
            <Text style={styles.itemName}>{this.state.product.name}</Text>
            <Text style={styles.itemPrice}>{this.state.product.price}</Text>
            <Text style={styles.itemPrice}>x{this.state.quantity}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const {height, width} = Dimensions.get('window');

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

  titleHeader: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  childContainer: {
    margin: 10,
  },
  spaceContainer: {
    padding: 3,

    backgroundColor: '#E5E5E5',
  },
  titleComponent: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCartContainer: {
    borderTopWidth: 0.6,
    borderTopColor: '#E5E5E5',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },

  addCartButton: {
    paddingHorizontal: width / 4,
    backgroundColor: 'green',
    height: height / 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addCartText: {
    fontSize: 22,
    color: '#fff',
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
    width: width * 0.7,
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
