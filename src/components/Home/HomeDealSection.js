import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {Component} from 'react';
import {ProductData} from '../../data/ProductData';

import {getProductsFromServer} from '../../networking/Server';
import {getImageFromServer} from '../../networking/Server';

class HorizontalFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFromServer: [],
      // refreshing: true,
    };
  }

  componentDidMount() {
    this.refreshImageFromServer();
  }

  refreshImageFromServer = () => {
    // console.log("test nè" + this.props.item.images);
    getImageFromServer(this.props.item.images)
      .then(image => {
        this.setState({imageFromServer: image});
        // console.log('có chạy vô api get ảnh');

        // console.log('ảnh' + imageFromServer.img);
      })
      .catch(error => {
        console.log('Lỗi rồi');
        this.setState({imageFromServer: []});
      });
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen', {
              //image là fake link
              product_id: this.props.item.id,
              image: this.state.imageFromServer.img,
              price: this.props.item.price,
              name: this.props.item.name,
              product: this.props.item,
            });
          }}>
          <Image
            //image là fake link
            // source={{uri: this.props.item.description}}
            // source={{uri:"http://127.0.0.1:8000/media/media/A_book.drawio.png"}}
            source={{uri: this.state.imageFromServer.img}}
            style={styles.itemImage}
          />

          <Text style={styles.itemPrice}>{this.props.item.price}</Text>
          <Text style={styles.itemName}>{this.props.item.name}</Text>
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
            data={this.state.productsFromServer.results}
            renderItem={({item, index}) => {
              return (
                <HorizontalFlatListItem
                  navigation={navigation}
                  item={item}
                  index={index}></HorizontalFlatListItem>
              );
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
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 12,
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
    // backgroundColor:'green',
  },

  itemContainer: {
    width: 100,
    backgroundColor: '#fff',
    marginRight: 2,
    // marginTop: 10,
  },

  itemImage: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  itemName: {
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
