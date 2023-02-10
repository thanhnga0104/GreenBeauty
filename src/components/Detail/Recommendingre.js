import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {getRecommendingre} from '../../services/recommendServices';
import RecommendingreItem from './RecommendingreItem';

const Recommendingre = props => {
  const {navigation, id} = props;
  const [listIdRecommendProducts, setListIdRecommendProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const getRecommendProducts = () => {
    setRefresh(true);
    getRecommendingre(id)
      .then(products => {
        setListIdRecommendProducts(products);
        setRefresh(false);
      })
      .catch(error => {
        setListIdRecommendProducts([]);
      });
  };

  useEffect(() => {
    getRecommendProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // handleRefresh = () => {
  //   this.setState({refreshing: false}, () => {
  //     this.refreshDataFromServer();
  //   });
  // };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTile}>Có thể bạn cũng thích</Text>
      <View>
        <FlatList
          scrollEnabled={false}
          nestedScrollEnabled={true}
          numColumns={2}
          data={listIdRecommendProducts}
          renderItem={({item, index}) => {
            return (
              <RecommendingreItem
                navigation={navigation}
                id={item?.id}
                index={index}
              />
            );
          }}
          refreshing={refresh}
          // onRefresh={this.handleRefresh}
        />
      </View>
    </View>
  );
};

export default Recommendingre;

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 8,
  },

  sectionTile: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
});
