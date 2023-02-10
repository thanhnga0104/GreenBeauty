import React, {useState, useEffect} from 'react';
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
  FlatList,
} from 'react-native';
import DetailHeader from '../../components/Detail/DetailHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getListImage, getImageFromServer} from '../../services';
import {BottomPopup} from '../../components/Detail/BottomPopup';
import {getDataUser, getProductFromCart} from '../../services';
import {postItemToCart, putItemInCart, postToLoveList} from '../../services';
import {getProductFromLoveList, deleteProducLoveList} from '../../services';
import Recommendingre from '../../components/Detail/Recommendingre';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {retrieve} from '../../redux/slides/product/productSlice';
import {formatThousandNumber} from '../../utils/formatThousandNumber';

const DetailScreen = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const {product} = route.params;
  const [imageData, setImageData] = useState([]);
  const [listData, setListData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [tontai, setTontai] = useState(false); //chưa tồn tại sp
  const [product_Exist, setProduct_Exist] = useState();
  const [isLoveExist, setIsLoveExist] = useState(false);
  const [isLove, setIsLove] = useState(false);
  const [isLoveID, setIsLoveID] = useState();
  const [quantityOfCart, setQuantityOfCart] = useState(0);

  let img = [];
  img = imageData;

  const setIdLastViewingProduct = async () => {
    try {
      await AsyncStorage.setItem('lastViewingProduct', product?.id.toString());
    } catch (e) {
      console.log(e);
    }
  };
  const fetchListImage = () => {
    let listImage = [];
    listImage.push(product.imagepresent);
    setImageData(listImage);

    getListImage(product.id)
      .then(images => {
        images.forEach(image => {
          getImageFromServer(image.id)
            .then(result => {
              listImage.push(result.img);
              setImageData(listImage);
            })
            .catch(error => {
              setImageData([]);
            });
        });
      })
      .catch(error => {
        setImageData([]);
      });
  };

  //fetch dữ liệu giỏ hàng
  const fetchProductFromCart = () => {
    getDataUser()
      .then(user => {
        getProductFromCart(user.userID, '')
          .then(items => {
            items.forEach(item => {
              if (item.product === product.id) {
                setTontai(true);
                setProduct_Exist(item);
                //sản phẩm đã tồn tại
              }
            });
            setListData(items);
            setUserData(user);
            setQuantityOfCart(Object.keys(items).length);
          })
          .catch(error => {
            setListData([]);
          });

        checkLoveList(user.userID);
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  //refresh khi thêm sản phẩm mới
  const refreshProductFromCart = () => {
    getProductFromCart(userData.userID, '')
      .then(items => {
        items.forEach(item => {
          if (item.product === product.id) {
            setTontai(true);
          }
        });
        setListData(items);
      })
      .catch(error => {
        setListData([]);
      });
  };

  const checkSoLuong = () => {
    listData.forEach(index => {
      if (index.product === product.id) {
        setTontai(true);
        // đã có trong giỏ hàng, put
      }
    });
  };

  const checkLoveList = user_id => {
    getProductFromLoveList(user_id)
      .then(list => {
        if (Object.keys(list).length === 0) {
          setIsLoveExist(false);
        } else {
          list.forEach(item => {
            if (item.product_id === product.id) {
              setIsLoveExist(true);
              setIsLoveID(item.id);
            }
          });
        }
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  const handleChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
    }
  };

  //phần này là code của bottom pupup: như show dialog á
  //Phần này là code khi bấm thêm vào giỏ hàng

  let popupRef = React.createRef();
  const addCartToServer = () => {
    if (tontai === false) {
      fetchProductFromCart();
      postItemToCart(userData, product)
        .then(item => {
          refreshProductFromCart();
        })
        .catch(error => {
          console.error(`Error is: ${error}`);
        });
    } else if (tontai === true) {
      fetchProductFromCart();
      putItemInCart('+', userData, product_Exist)
        .then(item => {
          //Chỗ này phải so sánh số lượng đang ở trong giỏ hàng của 1 user, nhiều user với tổng số lượng sp
          refreshProductFromCart();
        })
        .catch(error => {
          console.error(`Error is: ${error}`);
        });
    }

    setTontai(true);
    popupRef.show();
  };

  const handleLoveList = () => {
    if (isLoveExist === false) {
      postToLoveList(userData, product.id)
        .then(result => {
          setIsLove(true);
          setIsLoveExist(true);
          setIsLoveID(result.id);
          Alert.alert('', 'Đã thêm sản phẩm vào mục yêu thích');
        })
        .catch(error => {
          console.error(`Error is: ${error}`);
        });

      checkLoveList(userData.userID);
    } else {
      deleteProducLoveList(isLoveID)
        .then(() => {
          setIsLove(false);
          setIsLoveExist(false);

          Alert.alert('', 'Đã xóa sản phẩm khỏi mục yêu thích');
          return;
        })
        .catch(error => {
          console.error(`Error is: ${error}`);
        });
      checkLoveList(userData.userID);
    }
  };

  useEffect(() => {
    dispatch(retrieve(product?.id));

    setIdLastViewingProduct();
    fetchProductFromCart();
    fetchListImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityOfCart, product?.id]);

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <DetailHeader navigation={navigation} quantityOfCart={quantityOfCart} />
      <View style={styles.flex1}>
        <FlatList
          LisHeaderComponent={<Text />}
          ListFooterComponent={
            <>
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
                {product.IsFlashsale === true ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.productPrice}>
                      {formatThousandNumber(
                        product.price -
                          (product.price * product.priceSale) / 100,
                      )}
                      đ
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#827A7A',
                          textDecorationLine: 'line-through',
                          marginTop: 8,
                          fontSize: 16,
                          marginRight: 2,
                          alignItems: 'center',
                        }}>
                        {formatThousandNumber(product.price)}đ
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#FF5F04',
                          borderRadius: 3,
                          justifyContent: 'center',
                          marginTop: 6,
                        }}>
                        <Text style={{padding: 2, color: '#fff', fontSize: 16}}>
                          {' '}
                          -{product.priceSale}%
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.productPrice}>
                    {formatThousandNumber(product.price)}đ
                  </Text>
                )}
              </View>

              <View style={{flexDirection: 'row', padding: 10, width: '100%'}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DetailRating', {
                      id: product.id,
                    });
                  }}>
                  <Text style={{fontSize: 16}}>Đánh giá</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 5}}>
                  <Text style={{fontSize: 16, color: '#827A7A'}}>|</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{fontSize: 16}}>Đã bán</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shareContainer}
                  onPress={handleLoveList}>
                  {isLove === false ? (
                    <Ionicons name="heart-outline" size={28} color="black" />
                  ) : (
                    <Ionicons name="heart-sharp" size={28} color="red" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.spaceContainer}></View>

              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('DescriptionScreen', {
                    product: product,
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

              <View style={styles.spaceContainer}></View>
              <View style={styles.descriptionSection}>
                <Text style={styles.titleText}>Thông tin chi tiết</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{paddingRight: 30}}>
                    <Text style={styles.infoText}>Thương hiệu: </Text>
                    <Text style={styles.infoText}>Xuất xứ: </Text>
                    <Text style={styles.infoText}>Loại da: </Text>
                  </View>
                  <View>
                    <Text style={styles.infoText}>{product.brand}</Text>
                    <Text style={styles.infoText}>{product.origin}</Text>
                    <Text style={styles.infoText}></Text>
                  </View>
                </View>
              </View>

              <View style={styles.spaceContainer}></View>

              <TouchableOpacity
                style={{padding: 10, flexDirection: 'row'}}
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('InstructionScreen', {
                    product: product,
                  });
                }}>
                <Text style={styles.titleText}>Hướng dẫn sử dụng</Text>
                <View style={styles.rightContainer}>
                  <EvilIcons name="chevron-right" size={30} color="black" />
                </View>
              </TouchableOpacity>

              <View style={styles.spaceContainer}></View>
              <TouchableOpacity
                style={{padding: 10, flexDirection: 'row'}}
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('ThanhPhan', {
                    product: product,
                  });
                }}>
                <Text style={styles.titleText}>Thành phần sản phẩm</Text>

                <View style={styles.rightContainer}>
                  <EvilIcons name="chevron-right" size={30} color="black" />
                </View>
              </TouchableOpacity>
              <View style={styles.spaceContainer}></View>

              <View style={styles.spaceContainer}></View>
              <TouchableOpacity
                style={{padding: 10, flexDirection: 'row'}}
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('DetailRating', {
                    id: product.id,
                  });
                }}>
                <Text style={styles.titleText}>Đánh giá</Text>

                <View style={styles.rightContainer}>
                  <EvilIcons name="chevron-right" size={30} color="black" />
                </View>
              </TouchableOpacity>

              <Recommendingre navigation={navigation} id={product.id} />

              <View style={styles.spaceContainer} />
            </>
          }
        />
      </View>

      {/* <ScrollView style={{backgroundColor: '#fff'}}>
     
      </ScrollView> */}

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
        image={product.imagepresent}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },

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
    color: '#FF5F04',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 50,
    marginTop: 6,
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
  },

  infoText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '400',
  },

  addCartContainer: {
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
