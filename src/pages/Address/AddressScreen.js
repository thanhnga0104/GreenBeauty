import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDataUser} from '../../services';
import {getAddress} from '../../services';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchDataUser();
    });
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
        borderBottomWidth: 0.6,
        borderColor: 'black',
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

        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: '#fff',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              navigation.navigate('AddLocationScreen', {isFirst: false});
            }}>
            <Text style={{fontSize: 16}}>Thêm địa chỉ</Text>
            <Ionicons name="add-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#E5E5E5',
          }}
        />
        <View>
          <FlatList
            data={this.state.delivery}
            ListEmptyComponent={EmptyComponent(navigation)}
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

const EmptyComponent = navigation => {
  return (
    <View style={{paddingTop: 150, alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="shoppingcart" size={80} color="#595654" />
      </TouchableOpacity>
      <Text style={{fontSize: 16}}>
        Bạn chưa có sản phẩm nào trong giỏ hàng
      </Text>
      <TouchableOpacity
        style={{
          height: 40,
          width: '85%',
          margin: 10,
          backgroundColor: '#FF5F04',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
        }}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '500',
          }}>
          TIẾP TỤC MUA SẮM
        </Text>
      </TouchableOpacity>
    </View>
  );
};

class AddressFlatListItem extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <View style={styles.addressItem}>
          <Text>{this.props.item.receiveName}</Text>
          <Text>{this.props.item.phone}</Text>
          <Text>{this.props.item.fullAddress}</Text>
        </View>
      </View>
    );
  }
}

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

  addressItem: {
    backgroundColor: '#fff',
    padding: 10,
  },
});
