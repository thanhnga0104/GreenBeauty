import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {getProductsFromServer} from '../../networking/Server';
import {getProductFromLoveList} from '../../networking/Server';
import {getDataUser} from '../../networking/Server';
import {getProductById} from '../../networking/Server';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class LoveListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsFromServer: [],
      imageFromServer: [],
      //   refreshing: true,
    };
  }

  componentDidMount() {
    this.refreshDataFromServer();
  }

  refreshDataFromServer = () => {
    getDataUser()
      .then(user => {
        getProductFromLoveList(user.userID)
          .then(products => {
            let listProduct =this.state.productsFromServer;
            products.forEach(item => {
              getProductById(item.product_id)
                .then(result => {
                  console.log('result:', result);
                  listProduct.push(result);
                  console.log('listProduct:', listProduct);
                  this.setState({productsFromServer: listProduct});
                })
                .catch(error => {
                });
            });
            
            this.setState({productsFromServer: listProduct});
          })
          .catch(error => {});
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  render() {
    const {navigation, route} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
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
            <Text style={styles.titleScreen}>Sản phẩm yêu thích</Text>
          </View>
        </View>
     

        {/* <View style={styles.sectionContainer}> */}
        <View style={{padding:10}}>
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
          ></FlatList>
        </View>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}

class RecommendFlatListItem extends Component {
  render() {
    const {navigation} = this.props;
    console.log('this.props.item:', this.props.item);
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen', {
              product: this.props.item,
            });
          }}>
          <Image
            source={{uri: this.props.item.imagepresent}}
            style={styles.imageContainer}
          />
          <Text style={styles.priceContainer}>{this.props.item.price}</Text>
          <Text style={styles.nameContainer}>{this.props.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

  titleScreen: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  sectionContainer: {
    backgroundColor: '#E5E5E5',
    marginHorizontal: 8,
  },
  itemContainer: {
    backgroundColor: '#fff',
    width: windowWidth / 2 - 20,
    margin: 5,
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
