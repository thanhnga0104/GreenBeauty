import React from 'react';
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

import {getProductsFromServer} from '../../networking/Server';

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
            {this.props.item.IsFlashsale == true ? (
              <View style={styles.sale}>
                <Text
                  style={{
                    fontSize: scale(14),
                    fontWeight: 'bold',
                    color: '#FFF',
                  }}>
                  -{this.props.item.priceSale}%
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
          </View>
          {this.props.item.IsFlashsale == true ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.itemPrice}>
                {this.props.item.price -
                  (this.props.item.price * this.props.item.priceSale) / 100}
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
                  {this.props.item.price}đ
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.itemPrice}>{this.props.item.price}</Text>
          )}
          {/* <Text style={styles.itemPrice}>{this.props.item.priceSale}</Text> */}
          <Text style={styles.itemName} numberOfLines={3}>
            {this.props.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class HomeDealSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsFromServer: [],
      imageFromServer: [],
      refreshing: true,
    };
  }

  componentDidMount() {
    this.refreshDataFromServer();
  }

  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getProductsFromServer()
      .then(products => {
        this.setState({productsFromServer: products});
        this.setState({refreshing: false});
      })
      .catch(error => {
        this.setState({productsFromServer: []});
      });
  };

  handleRefresh = () => {
    this.setState({refreshing: false}, () => {
      this.refreshDataFromServer();
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTile}>DEALS ĐANG DIỄN RA</Text>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.productsFromServer}
            renderItem={({item, index}) => {
              return item.IsFlashsale ? (
                <HorizontalFlatListItem
                  navigation={navigation}
                  item={item}
                  index={index}></HorizontalFlatListItem>
              ) : null;
            }}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}></FlatList>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sectionContainer: {
   // backgroundColor: '#E5E5E5',
   // paddingHorizontal: 12,
   marginHorizontal:12
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
    //top:scale(10)
     bottom: scale(152),
     left: scale(111),
  },
});
