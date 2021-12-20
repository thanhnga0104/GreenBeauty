import React, {Component} from 'react';
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
import {getProductsFromServer} from '../../networking/Server';

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
              <Text style={styles.priceContainer}>
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
            <Text style={styles.priceContainer}>{this.props.item.price}</Text>
          )}
          {/* <Text style={styles.priceContainer}>{this.props.item.price}</Text> */}
          <Text style={styles.nameContainer}>{this.props.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class HomeRecommendSection extends Component {
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
        <Text style={styles.sectionTile}>GỢI Ý HÔM NAY</Text>
        <View>
          <FlatList
            scrollEnabled={false}
            nestedScrollEnabled={true}
            numColumns={2}
            data={this.state.productsFromServer}
            renderItem={({item, index}) => {
              return (
                <RecommendFlatListItem
                  navigation={navigation}
                  item={item}
                  index={index}></RecommendFlatListItem>
              );
            }}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}></FlatList>
        </View>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  sectionContainer: {
   // backgroundColor: '#E5E5E5',
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
    paddingLeft:5,
    fontSize: 14,
    color: '#484848',
  },

  priceContainer: {
    paddingLeft:5,
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
});
