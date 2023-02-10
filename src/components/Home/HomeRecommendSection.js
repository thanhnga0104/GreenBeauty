import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {getRecommend} from '../../services/recommendServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecommendingreItem from '../Detail/RecommendingreItem';
import {useSelector} from 'react-redux';
import {selectProduct} from '../../redux/slides/product/productSlice';

const HomeRecommendSection = props => {
  const {navigation} = props;

  const idRCM = useSelector(selectProduct);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [IdLastViewingProduct, setIDLastViewingProduct] = useState('42');

  const getIdLastViewingProduct = async () => {
    try {
      const value = await AsyncStorage.getItem('lastViewingProduct');
      setIDLastViewingProduct(value);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = () => {
    setRefresh(true);
    getRecommend(idRCM)
      .then(res => {
        console.log({res});
        setProducts(res);
        setRefresh(false);
      })
      .catch(error => {
        setProducts([]);
      });
  };

  const handleRefresh = () => {
    setRefresh(false);
    getData();
  };

  useEffect(() => {
    console.log({idRCM});
    getIdLastViewingProduct();
    getData(idRCM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRCM]);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTile}>SẢN PHẨM GỢI Ý</Text>
      <View>
        <FlatList
          scrollEnabled={false}
          nestedScrollEnabled={true}
          numColumns={2}
          data={products}
          renderItem={({item, index}) => {
            return (
              <RecommendingreItem
                navigation={navigation}
                id={item?.product_id}
                index={index}
              />
            );
          }}
          refreshing={refresh}
          onRefresh={handleRefresh}
        />
      </View>
    </View>
  );
};

export default HomeRecommendSection;

class RecommendFlatListItem extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen', {
              product: this.props.item,
            });
          }}>
          <View>
            <Image
              source={{uri: this.props.item.imagepresent}}
              style={styles.imageContainer}
            />
            {this.props.item.IsFlashsale === true ? (
              <View style={styles.sale}>
                <Text style={styles.percentPriceSale}>
                  -{this.props.item.priceSale}%
                </Text>
              </View>
            ) : (
              <Text />
            )}
          </View>
          {this.props.item.IsFlashsale === true ? (
            <View style={styles.priceContainer}>
              <Text style={styles.priceSale}>
                {this.props.item.price -
                  (this.props.item.price * this.props.item.priceSale) / 100}
                đ
              </Text>
              <View style={styles.priceRemainingContainer}>
                <Text style={styles.priceRemaining}>
                  {this.props.item.price}đ
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.priceContainer}>{this.props.item.price}</Text>
          )}
          <Text style={styles.nameContainer}>{this.props.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 8,
  },

  itemContainer: {
    backgroundColor: '#fff',
    width: windowWidth / 2 - 20,
    margin: 5,
  },
  sectionTile: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 4,
  },

  imageContainer: {
    width: windowWidth / 2 - 20,
    height: windowWidth / 2 - 20,
  },

  nameContainer: {
    paddingLeft: 5,
    fontSize: 14,
    color: '#484848',
  },

  priceSale: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5F04',
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sale: {
    height: scale(20),
    width: scale(40),
    borderRadius: scale(3),
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#FF5F04',
    alignItems: 'center',
    bottom: scale(156),
    left: scale(116),
  },

  percentPriceSale: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#FFF',
  },
  priceRemainingContainer: {flexDirection: 'row'},
  priceRemaining: {
    color: '#827A7A',
    textDecorationLine: 'line-through',
    fontSize: 16,
    marginRight: 4,
    alignItems: 'center',
  },
});
