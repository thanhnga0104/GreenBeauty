import React from 'react';
import {useState} from 'react';
import {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import DetailHeader from '../../components/Detail/DetailHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getProductById} from '../../networking/Server';
import {getImageFromServer} from '../../networking/Server';
import {BottomPopup} from '../../components/Detail/BottomPopup';
import {ProductData} from '../../data/ProductData';
import {getDataUser} from '../../networking/Server';
import {getProductFromCart} from '../../networking/Server';
import {postItemToCart} from '../../networking/Server';
import {putItemInCart} from '../../networking/Server';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [],
      listData: [],
      userData: null,
      tontai: false, //chưa tồn tại sp
      product_Exist: '',
    };
  }

  componentDidMount() {
    this.refreshImageData();
    this.fetchProductFromCart();
  }

  refreshImageData = () => {
    let data = this.props.route.params.product.images;
    console.log('data image: ', data);
    let images = [];
    data.forEach(data => {
      getImageFromServer(data)
        .then(image => {
          images.push(image.img);
          this.setState({imageData: images});
        })
        .catch(error => {
          this.setState({imageData: []});
        });
    });
  };
  //fetch dữ liệu giỏ hàng
  fetchProductFromCart = () => {
    getDataUser()
      .then(user => {
        getProductFromCart(user.userID, '')
          .then(items => {
            items.forEach(item => {
              if (item.product === this.props.route.params.product.id) {
                console.log('coi item:', item);
                this.setState({tontai: true, product_Exist: item}); //sản phẩm đã tồn tại
              }
            });
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
  //refresh khi thêm sản phẩm mới
  refreshProductFromCart = () => {
    getProductFromCart(this.state.userData.userID, '')
      .then(items => {
        items.forEach(item => {
          if (item.product === this.props.route.params.product.id) {
            this.setState({tontai: true});
          }
        });
        this.setState({listData: items});
      })
      .catch(error => {
        this.setState({listData: []});
      });
  };

  checkSoLuong = () => {
    this.state.listData.forEach(index => {
      if (index.product === this.props.route.params.product.id) {
        console.log(
          'index:',
          index.product + ' id:',
          this.props.route.params.product.id,
        );
        this.setState({tontai: true}); // đã có trong giỏ hàng, put
      }
    });
  };

  render() {
    const {navigation, route} = this.props;
    const {product} = route.params;
    const {image} = route.params;
    let img = [];
    img = this.state.imageData;

    const handleChange = nativeEvent => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
      }
    };

    //phần này là code của bottom pupup: như show dialog á
    //Phần này là code khi bấm thêm vào giỏ hàng

    const addCart = () => {
      let productItem = {
        id: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        images: product.images,
      };

      if (product_list.length == 0) {
        product_list.push(productItem);
      } else {
        product_list.forEach(index => {
          if (index.id != productItem.id) {
            product_list.push(productItem);
          } else {
            index.quantity++;
          }
        });
      }

      popupRef.show();
    };

    let popupRef = React.createRef();
    const addCartToServer = () => {
      {
        console.log('ton tai:', this.state.tontai);
        if (this.state.tontai == false) {
          postItemToCart(this.state.userData, product)
            .then(item => {
              console.log('Thêm vào giỏ hàng thành công');

              this.refreshProductFromCart();
            })
            .catch(error => {
              console.error(`Error is: ${error}`);
            });
        } else if (this.state.tontai == true) {
          putItemInCart('+',this.state.userData, this.state.product_Exist)
            .then(item => {
              console.log('Đã update số lượng sản phẩm');
              //Chỗ này phải so sánh số lượng đang ở trong giỏ hàng của 1 user, nhiều user với tổng số lượng sp
              this.refreshProductFromCart();
            })
            .catch(error => {
              console.error(`Error is: ${error}`);
            });
        }
      }
      popupRef.show();
    };

    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <DetailHeader navigation={navigation} />

        {/* Bắt đầu phần detail */}
        <ScrollView style={{backgroundColor: '#fff'}}>
          <View style={styles.wrap}>
            <ScrollView
              onScroll={({nativeEvent}) => handleChange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrap}>
              {img.map((e, index) => (
                <Image
                  key={e}
                  resizeMode="stretch"
                  style={styles.wrap}
                  source={{uri: e}}
                />
              ))}
            </ScrollView>
          </View>

          <View style={{padding: 10}}>
            <Text style={styles.productNameText}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>

          <View style={{flexDirection: 'row', padding: 10, width: '100%'}}>
            <TouchableOpacity style={{marginRight: 10}}>
              <Text>Đánh giá</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text>Hỏi đáp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartContainer}>
              <EvilIcons name="heart" size={32} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareContainer}>
              <Icon name="share-outline" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceContainer}></View>

          {/* Mô tả sản phẩm */}
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('DescriptionScreen', {
                product_description: product.description,
              });
            }}>
            <View style={styles.descriptionSection}>
              <Text style={styles.titleText}>Mô tả sản phẩm</Text>
              <Text numberOfLines={5}>{product.description}</Text>
            </View>
            <View style={styles.rightContainer}>
              <EvilIcons name="chevron-right" size={30} color="black" />
            </View>
          </TouchableOpacity>

          {/* End Mô tả sản phẩm */}

          {/* Thông tin chi tiết */}

          <View style={styles.spaceContainer}></View>
          <View style={styles.descriptionSection}>
            <Text style={styles.titleText}>Thông tin chi tiết</Text>
            <Text style={styles.infoText}>Thương hiệu</Text>
            <Text style={styles.infoText}>Xuất xứ thương hiệu</Text>
            <Text style={styles.infoText}>Nơi sản xuất</Text>
            <Text style={styles.infoText}>Loại da</Text>
          </View>

          {/* End Thông tin chi tiết */}

          {/* Hướng dẫn sử dụng */}
          <View style={styles.spaceContainer}></View>

          <TouchableOpacity
            style={{padding: 10, flexDirection: 'row'}}
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('InstructionScreen', {
                product: {product},
              });
            }}>
            <Text style={styles.titleText}>Hướng dẫn sử dụng</Text>
            <View style={styles.rightContainer}>
              <EvilIcons name="chevron-right" size={30} color="black" />
            </View>
          </TouchableOpacity>

          {/* end Hướng dẫn sử dụng */}
          <View style={styles.spaceContainer}></View>
          <TouchableOpacity style={{padding: 10, flexDirection: 'row'}}>
            <Text style={styles.titleText}>Thành phần sản phẩm</Text>

            <View style={styles.rightContainer}>
              <EvilIcons name="chevron-right" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <View style={styles.spaceContainer}></View>

          <View style={styles.spaceContainer}></View>
          <TouchableOpacity style={{padding: 10, flexDirection: 'row'}}
           onPress={() => {
            navigation.navigate('RatingScreen', {
              id: product.id,
            });
          }}>
            <Text style={styles.titleText}>Đánh giá</Text>

            <View style={styles.rightContainer}>
              <EvilIcons name="chevron-right" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <View style={styles.spaceContainer}></View>
        </ScrollView>

        <View style={styles.addCartContainer}>
          <TouchableOpacity
            style={styles.addCartButton}
            onPress={addCartToServer}>
            <Text style={styles.addCartText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>

        <BottomPopup
          ref={target => (popupRef = target)}
          product={product}
          image={image}
          navigation={navigation}
        />
      </SafeAreaView>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrap: {
    height: 350,
    width: Dimensions.get('window').width,
  },

  image: {
    height: 350,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },

  productNameText: {
    fontSize: 16,
    fontWeight: '500',
  },

  productPrice: {
    marginTop: 8,
    color: 'red',
    fontSize: 18,
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 50,
    marginTop: 8,
  },
  shareContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    marginTop: 4,
  },

  descriptionSection: {
    justifyContent: 'center',
    // height: 120,
    padding: 10,
    width: width / 1.07,
  },
  titleText: {
    width: width / 1.1,
    fontSize: 14,
    fontWeight: '700',
    flexWrap: 'wrap',
  },

  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  spaceContainer: {
    padding: 1,
    backgroundColor: '#E5E5E5',
    // margin:4,
  },

  infoText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '300',
  },

  addCartContainer: {
    // borderWidth: 0.3,
    borderTopWidth: 0.6,
    borderTopColor: '#E5E5E5',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default DetailScreen;
