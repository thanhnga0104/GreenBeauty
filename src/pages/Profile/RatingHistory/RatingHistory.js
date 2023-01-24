import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RatingComponent from '../../../components/Rating/RatingComponent';
import {getRatingbyUserid} from '../../../services';
import ProductComponent from '../../../components/Profile/ProductComponent';

const RatingHistory = ({navigation, route}) => {
  const ItemSepatator = () => (
    <View
      style={{
        borderBottomWidth: 0.6,
        borderColor: '#E5E5E5',
      }}
    />
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(route.params.user);
    getRatingbyUserid(route.params.user).then(re => {
      console.log('data', re);
      setData(re);
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
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
          <Text style={styles.titleScreen}>Lịch sử đánh giá</Text>
        </View>
      </View>
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSepatator}
        renderItem={({item}) => {
          return (
            <View>
              <ProductComponent id={item.product} />
              <RatingComponent
                id={route.params.id}
                point={item.ratingpoint}
                comment={item.ratingcomment}
                img={'http://127.0.0.1:8000' + item.img}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
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
});
export default RatingHistory;
