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
import {getProductsFromServer} from '../../networking/Server';
import {getImageFromServer} from '../../networking/Server';

class RecommendFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFromServer: [],
    };
  }

  componentDidMount() {
    this.refreshImageFromServer();
  }

  refreshImageFromServer = () => {
    let data = this.props.item.images;
    data.forEach(data => {
      getImageFromServer(data)
        .then(image => {
          if (this.state.imageFromServer == '') {
           // console.log('log ở recommend:', image);
            this.setState({imageFromServer: image});
          }
        })
        .catch(error => {
          this.setState({imageFromServer: []});
        });
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen', {
              image: this.state.imageFromServer.img,
              product: this.props.item,
            });
          }}>
          {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen', {
              product_id: this.props.item.id,
              image: this.state.imageFromServer.img,
              price: this.props.item.price,
              name: this.props.item.name,
              product: this.props.item,
            });
          }}> */}
          <Image
            source={{uri: this.state.imageFromServer.img}}
            style={styles.imageContainer}
          />
          <Text style={styles.priceContainer}>{this.props.item.price}</Text>
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

  // refreshDataFromServer = () => {
  //   this.setState({refreshing: true});
  //   getProductsFromServer()
  //     .then(products => {
  //       this.setState({productsFromServer: products});
  //       this.setState({refreshing: false});
  //     })
  //     .catch(error => {
  //       this.setState({productsFromServer: []});
  //     });
  // };

  // handleRefresh = () => {
  //   this.setState({refreshing: false}, () => {
  //     this.refreshDataFromServer();
  //   });
  // };

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
    backgroundColor: '#E5E5E5',
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
    fontSize: 14,
    color: '#484848',
  },

  priceContainer: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5F04',
  },
});
