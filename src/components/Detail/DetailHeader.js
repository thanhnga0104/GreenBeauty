import React from 'react';
import {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDataUser} from '../../networking/Server';
import {getProductFromCart} from '../../networking/Server';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const colorIcon = '#827A7A';
export default class DetailHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityOfCart: 0,
    };
  }

  componentDidMount() {
    this.fetchProductFromCart();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchProductFromCart();
    });
  }

  fetchProductFromCart = () => {
    getDataUser()
      .then(user => {
        getProductFromCart(user.userID, '')
          .then(items => {
            this.setState({quantityOfCart: Object.keys(items).length});
          })
          .catch(error => {
            console.log('Lỗi tại DetailHeader');
            this.setState({quantityOfCart: 0});
          });
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color={colorIcon}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <FontAwesome name="search" size={20} color={colorIcon} />
          <Text> Tìm kiếm </Text>
        </TouchableOpacity>

        <View style={styles.cartContainer}>
          <AntDesign
            name="shoppingcart"
            size={24}
            color={colorIcon}
            
            onPress={() => {
              navigation.navigate('CartScreen');
            }}
          />
          {this.state.quantityOfCart > 0 ? (
            <View style={styles.circle}>
              <Text
                style={{
                  fontSize: scale(7),
                  fontWeight: 'bold',
                  color: '#FFF',
                }}>
                {this.state.quantityOfCart}
              </Text>
            </View>
          ) : (
            <View>
              <Text> </Text>
            </View>
          )}
        </View>

        <View style={styles.ellipsisContainer}>
          <Ionicons
            name="ellipsis-vertical-sharp"
            size={24}
            color={colorIcon}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#fff',
    //backgroundColor:'transparent'
  },
  backContainer: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    marginBottom: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  cartContainer: {
    height: 24,
    width: 24,
   // borderRadius: 12,
   //paddingLeft:15,
   marginLeft: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: colorIcon,
  },
  ellipsisContainer: {
   // borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: scale(14),
    width: scale(14),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#F28244',
    alignItems: 'center',
    bottom: scale(26),
    left: scale(8)
  },
});
