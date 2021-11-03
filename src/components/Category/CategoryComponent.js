import React from 'react';
import {Component} from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
import {CategoryData} from '../../data/CategoryData';
import {TypeData} from '../../data/TypeData';

class CategoryFlatListItem extends Component {
  render() {
    return (
      <View style={styles.CategoryItem}>
        <Text style={styles.nameCategoryItem}>{this.props.item.name}</Text>
      </View>
    );
  }
}

class CategoryFlatList extends Component {
  render() {
    return (
      <View>
        <FlatList
          data={CategoryData}
          renderItem={({item, index}) => {
            return (
              <CategoryFlatListItem
                // navigation={navigation}
                item={item}
                index={index}></CategoryFlatListItem>
            );
          }}></FlatList>
      </View>
    );
  }
}
class TypeFlatListItem extends Component {
  render() {
    return (
      <View style={styles.TypeItem}>
        <Image
          style={styles.imageTypeItem}
          source={{uri: this.props.item.image}}></Image>

        <Text style={styles.nameTypeItem}>{this.props.item.name}</Text>
      </View>
    );
  }
}

class TypeFlastList extends Component {
  render() {
    return (
      <View>
        <FlatList
          numColumns={3}
          data={TypeData}
          renderItem={({item, index}) => {
            return (
              <TypeFlatListItem
                // navigation={navigation}

                item={item}
                index={index}></TypeFlatListItem>
            );
          }}></FlatList>
      </View>
    );
  }
}

export default class CategoryComponent extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <CategoryFlatList />
        <TypeFlastList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CategoryItem: {
    width: 70,
    height: 80,
    backgroundColor: '#E5E5E5',
    borderWidth: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameCategoryItem: {
    color: 'black',
    //  alignItems:'center',
  },
  TypeItem: {
    width: 100,
    alignItems: 'center',
    // justifyContent: 'center',
    
  },
  imageTypeItem: {
      marginTop:10,
    width: 80,
    height: 80,
  },

  nameTypeItem:{
      
  }
});
