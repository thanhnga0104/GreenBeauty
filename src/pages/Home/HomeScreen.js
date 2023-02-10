import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
} from 'react-native';
import HomeCircleSection from '../../components/Home/HomeCircleSection';
import HomeHeader from '../../components/Home/HomeHeader';
import HomeDealSection from '../../components/Home/HomeDealSection';
import HomeRecommendSection from '../../components/Home/HomeRecommendSection';
import {getDataUser} from '../../services';
import {getProductFromCart} from '../../services';
import BannerComponent from '../../components/Home/BannerComponent';
import HomeCategorySection from '../../components/Home/HomeCategorySection';

const HomeScreen = props => {
  const {navigation} = props;
  const [quantityOfCart, setQuantityOfCart] = useState(0);

  const fetchProductFromCart = () => {
    getDataUser()
      .then(user => {
        getProductFromCart(user.userID, '')
          .then(items => {
            setQuantityOfCart(Object.keys(items).length);
          })
          .catch(error => {
            console.log(error);
            setQuantityOfCart(0);
          });
      })
      .catch(error => {
        console.error(`Error is: ${error}`);
      });
  };

  useEffect(() => {
    fetchProductFromCart();
  }, []);

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar backgroundColor="#316C49" barStyle="light-content" />
      <HomeHeader navigation={navigation} quantityOfCart={quantityOfCart} />
      <View style={styles.flex1}>
        <FlatList
          LisHeaderComponent={<Text />}
          ListFooterComponent={
            <>
              <BannerComponent />

              <HomeCircleSection navigation={navigation} />

              <HomeDealSection navigation={navigation} />

              <HomeRecommendSection navigation={navigation} />

              <HomeCategorySection
                navigation={navigation}
                category={1}
                title="TẨY TRANG"
              />

              <HomeCategorySection
                navigation={navigation}
                category={4}
                title="KEM CHỐNG NẮNG"
              />
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
