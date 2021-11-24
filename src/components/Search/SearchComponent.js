import React from 'react';
import {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
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
  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('DetailScreen', {
            product_id: this.props.item.id,

            // image: this.state.imageFromServer.img,
            price: this.props.item.price,
            name: this.props.item.name,

            product: this.props.item,
          });
        }}>
        <Image
          /* source={{uri: this.state.imageFromServer.img}} */
          source={{uri: 'https://media.hasaki.vn/rating/158981046758840.jpg'}}
          style={styles.itemImage}
        />

        <View style={{padding: 10, alignSelf: 'center'}}>
          <Text style={styles.itemPrice}>{this.props.item.price}</Text>
          <Text style={styles.itemName}>{this.props.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // padding:5,
  },

  itemImage: {
    // borderRadius: 8,
    width: 50,
    height: 50,
    margin: 10,
    alignSelf: 'center',
  },
  itemName: {
    fontSize: 14,
    color: '#484848',
    // marginVertical: 4,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF5F04',
  },
});
