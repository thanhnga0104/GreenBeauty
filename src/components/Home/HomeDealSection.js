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
import {getProductsFromServer} from '../../networking/Server';
import {getImageFromServer} from '../../networking/Server';

class HorizontalFlatListItem extends Component {
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
    let data = [];
    data = this.props.item.images;
    data.forEach(data => {
      getImageFromServer(data)
        .then(image => {
          if (this.state.imageFromServer == '') {
           // console.log('log ở deal:', image);
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
          <Image
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
            data={this.state.productsFromServer}
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
  },

  itemContainer: {
    width: 100,
    backgroundColor: '#fff',
    marginRight: 2,
    borderRadius: 4,
  },

  itemImage: {
    borderRadius: 4,
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
