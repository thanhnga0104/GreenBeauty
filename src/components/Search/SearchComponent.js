import React from 'react';
import {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default class SearchComponent extends Component {
  ItemSepatator = () => (
    <View
      style={{
        borderBottomWidth: 0.3,
        borderColor: '#E5E5E5',
      }}
    />
  );

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <FlatList
          data={this.props.data}
          ItemSeparatorComponent={this.ItemSepatator}
          renderItem={({item, index}) => {
            return (
              <SearchFlatListItem
                navigation={navigation}
                item={item}
                index={index}
              />
            );
          }}
        />
      </View>
    );
  }
}

class SearchFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFromServer: [],
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('DetailScreen', {
            product: this.props.item,
          });
        }}>
        <Image
          source={{uri: this.props.item.imagepresent}}
          style={styles.itemImage}
        />

        <View style={{padding: 10, alignSelf: 'center'}}>
          <Text style={styles.itemName}>{this.props.item.name}</Text>
          <Text style={styles.itemPrice}>{this.props.item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  itemImage: {
    width: 50,
    height: 50,
    margin: 10,
    alignSelf: 'center',
  },

  itemName: {
    fontSize: 14,
    color: '#484848',
    width: width * 0.8,
    paddingRight: 10,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF5F04',
  },
});
