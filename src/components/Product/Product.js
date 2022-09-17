import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';

const windowWidth = Dimensions.get('window').width;

class Product extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.imageContainer} source={this.props.image} />
        <Text styles={styles.nameContainer}>{this.props.name}</Text>
        <Text style={styles.priceContainer}>{this.props.price}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: windowWidth / 2 - 20,
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

export default Product;
