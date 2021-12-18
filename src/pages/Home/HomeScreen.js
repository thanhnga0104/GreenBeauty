import React, {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import HomeCircleSection from '../../components/Home/HomeCircleSection';
import HomeHeader from '../../components/Home/HomeHeader';
import HomeDealSection from '../../components/Home/HomeDealSection';
import HomeRecommendSection from '../../components/Home/HomeRecommendSection';
import {getDataUser} from '../../networking/Server';
import {getProductFromCart} from '../../networking/Server';
import BannerComponent from '../../components/Home/BannerComponent';

export default class HomeScreen extends Component {
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
            console.log('Lỗi tại HomeHeader');
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
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor="#316C49" barStyle="light-content" />
        <HomeHeader
          navigation={navigation}
          quantityOfCart={this.state.quantityOfCart}
        />
        <View style={{flex: 1}}>
          <ScrollView style={styles.bodyContainer}>
            <View>
              <BannerComponent />
            </View>
            <View>
              <HomeCircleSection navigation={navigation} />
            </View>
            <View>
              <HomeDealSection navigation={navigation} />
            </View>
            <View>
              <HomeRecommendSection navigation={navigation} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    // flex: 1,
    backgroundColor: '#E5E5E5',
  },
});
