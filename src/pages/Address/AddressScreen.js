import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDataUser} from '../../networking/Server';
import {getAddress} from '../../networking/Server';

export default class AddressScreen extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      delivery: [],
    };
  }
  componentDidMount() {
    this.fetchDataUser();
  }

  fetchDataUser = () => {
    getDataUser()
      .then(user => {
        getAddress(user, '').then(address => {
          this.setState({userData: user, delivery: address});
        });
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

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
      <SafeAreaView style={{flex: 1, height: '100%'}}>
        <StatusBar backgroundColor="#316C49" barStyle="light-content" />
        <View style={styles.headerContainer}>
          <View style={styles.backContainer}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>

          <View>
            <Text style={styles.titleHeader}>Địa chỉ nhận hàng</Text>
          </View>          
        </View>

        {/* Bắt đầu body */}
        <View>
            <FlatList              
              data={this.state.delivery}
              ItemSeparatorComponent={this.ItemSepatator}
              renderItem={({item, index}) => {
                return (
                  <AddressFlatListItem
                    navigation={navigation}
                    item={item}
                    index={index}></AddressFlatListItem>
                );
              }}
            />
          </View>
      </SafeAreaView>
    );
  }
}

class AddressFlatListItem extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.addressItem}>
        <Text>{this.props.item.receiveName}</Text>
        <Text>{this.props.item.phone}</Text>
        <Text>{this.props.item.fullAddress}</Text>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#316C49',
  },

  backContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleHeader: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'center',
  },

  addressItem:{
    backgroundColor:'#fff',
    padding:10

  }
});
