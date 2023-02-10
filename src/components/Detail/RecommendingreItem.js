import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {getProductById} from '../../services';
import {formatThousandNumber} from '../../utils/formatThousandNumber';

const RecommendingreItem = props => {
  const {navigation, id} = props;
  const [product, setProduct] = useState();

  const getProduct = id => {
    getProductById(id)
      .then(p => {
        setProduct(p);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailScreen', {
            product: product,
          });
        }}>
        <View>
          <Image
            source={{uri: product?.imagepresent}}
            style={styles.imageContainer}
          />
          {product?.IsFlashsale === true ? (
            <View style={styles.sale}>
              <Text style={styles.priceSale}>-{product?.priceSale}%</Text>
            </View>
          ) : (
            <Text />
          )}
        </View>
        {product?.IsFlashsale === true ? (
          <View style={styles.priceSale}>
            <Text style={styles.priceContainer}>
              {formatThousandNumber(
                product?.price - (product?.price * product?.priceSale) / 100,
              )}
              đ
            </Text>
            <View style={styles.priceRemainingContainer}>
              <Text style={styles.priceRemaining}>
                {formatThousandNumber(product?.price)}đ
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.priceContainer}>
            {formatThousandNumber(product?.price || '0')}
          </Text>
        )}
        <Text style={styles.nameContainer}>{product?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendingreItem;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    width: windowWidth / 2 - 20,
    margin: 5,
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

  priceContainer: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5F04',
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

  priceSale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
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
