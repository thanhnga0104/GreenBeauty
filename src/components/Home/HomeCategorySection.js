import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Component} from 'react';
import {scale} from 'react-native-size-matters';

import {getProductsByCategory, getProductsFromServer} from '../../services';
import {formatThousandNumber} from '../../utils/formatThousandNumber';

class HorizontalFlatListItem extends Component {
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
              style={styles.itemImage}
            />
            {this.props.item.IsFlashsale === true ? (
              <View style={styles.sale}>
                <Text
                  style={{
                    color: '#FFF',
                  }}>
                  -{this.props.item.priceSale}%
                </Text>
              </View>
            ) : (
              <Text />
            )}
          </View>
          {this.props.item.IsFlashsale === true ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.itemPrice}>
                {formatThousandNumber(
                  this.props.item.price -
                    (this.props.item.price * this.props.item.priceSale) / 100,
                )}
                đ
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#827A7A',
                    textDecorationLine: 'line-through',
                    fontSize: 16,
                    marginRight: 4,
                    alignItems: 'center',
                  }}>
                  {formatThousandNumber(this.props.item.price)}đ
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.itemPrice}>
              {formatThousandNumber(this.props.item.price)}
            </Text>
          )}
          <Text style={styles.itemName} numberOfLines={3}>
            {this.props.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const HomeCategorySection = props => {
  const {navigation, title, category} = props;

  const [productsFromServer, setProductsFromServer] = useState([]);
  const [imageFromServer, setImageFromServer] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     productsFromServer: [],
  //     imageFromServer: [],
  //     refreshing: true,
  //   };
  // }

  // componentDidMount() {
  //   this.refreshDataFromServer(category);
  // }

  const refreshDataFromServer = category_id => {
    setRefreshing(true);
    getProductsByCategory(category_id)
      .then(products => {
        setProductsFromServer(products);
        setRefreshing(false);
      })
      .catch(error => {
        setProductsFromServer([]);
      });
  };

  // const handleRefresh = () => {
  //   this.setState({refreshing: false}, () => {
  //     this.refreshDataFromServer();
  //   });
  // };

  useEffect(() => {
    refreshDataFromServer(category);
  }, [category]);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTile}>{title}</Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={productsFromServer}
          renderItem={({item, index}) => {
            return (
              <HorizontalFlatListItem
                navigation={navigation}
                item={item}
                index={index}
              />
            );
          }}
          refreshing={refreshing}
          // onRefresh={handleRefresh}
        />
      </View>
    </View>
  );
};

export default HomeCategorySection;

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 12,
  },

  sectionTile: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginVertical: 12,
  },

  listItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  itemContainer: {
    width: 180,
    backgroundColor: '#fff',
    marginRight: 8,
    borderRadius: 4,
  },

  itemImage: {
    borderRadius: 4,
    width: 180,
    height: 180,
  },
  itemName: {
    fontSize: 15,
    color: '#484848',
    marginVertical: 4,
    marginHorizontal: 4,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5F04',
    marginHorizontal: 4,
  },
  sale: {
    height: scale(20),
    width: scale(40),
    borderRadius: scale(3),
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#FF5F04',
    alignItems: 'center',
    bottom: scale(152),
    left: scale(111),
  },
});
