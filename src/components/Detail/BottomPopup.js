import React from 'react';
import {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export class BottomPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({show: true});
  };

  close = () => {
    this.setState({show: false});
  };

  render() {
    const {product, image} = this.props;
    let {show} = this.state;
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <EvilIcons name="check" size={28} color="black" />
                <Text
                  style={{
                    fontSize: 16,
                    marginHorizontal: 10,
                    alignSelf: 'center',
                  }}>
                  Sản phẩm đã được thêm vào giỏ hàng
                </Text>
              </View>

              <MaterialIcons
                name="clear"
                size={24}
                color="black"
                onPress={this.close}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.image}
                  source={{
                    uri: image,
                  }}></Image>

                <View style={{paddingHorizontal: 10}}>
                  <Text style={styles.productNameText} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </View>
              <View style={styles.addCartContainer}>
                <TouchableOpacity style={styles.addCartButton}>
                  <Text style={styles.addCartText}>Xem giỏ hàng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 10,
    maxHeight: height * 0.4,
  },
  image: {
    height: 50,
    width: 50,
  },
  productNameText: {
    width: '70%',
    fontSize: 16,
    // fontWeight: '500',
  },
  productPrice: {
    color: 'red',
    fontSize: 16,
    flexWrap: 'wrap',
  },
  addCartContainer: {
    // borderWidth: 0.3,
    borderTopWidth: 0.6,
    borderTopColor: '#E5E5E5',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCartButton: {
    paddingHorizontal: width / 4,
    backgroundColor: 'green',
    height: height / 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addCartText: {
    fontSize: 22,
    color: '#fff',
  },
});
