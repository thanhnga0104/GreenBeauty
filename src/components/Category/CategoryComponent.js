import React from 'react';
import {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getTypeOfCategory} from '../../networking/Server';
import {getCategory} from '../../networking/Server';

class CategoryFlatListItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.item.selected
            ? styles.CategoryItemSelect
            : styles.CategoryItemUnSelect
        }
        onPress={() => {
          this.props.onPressTypeCategory(this.props.item, this.props.index),
            this.props.typeID(this.props.item.id);
        }}>
        <Text style={styles.nameCategoryItem}>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}

class CategoryFlatList extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <FlatList
          data={this.props.listType}
          renderItem={({item, index}) => {
            return (
              <CategoryFlatListItem
                navigation={navigation}
                typeID={this.props.typeID}
                onPressTypeCategory={this.props.onPressTypeCategory}
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
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.TypeItem}
        onPress={() => {
          navigation.navigate('RecommendProductScreen', {
            item: this.props.item,
          });
        }}>
        <Image
          style={styles.imageTypeItem}
          source={{uri: this.props.item.imagecategory}}></Image>

        <Text style={styles.nameTypeItem}>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}

class TypeFlastList extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <FlatList
          numColumns={3}
          data={this.props.listCategory}
          renderItem={({item, index}) => {
            return (
              <TypeFlatListItem
                navigation={navigation}
                item={item}
                index={index}></TypeFlatListItem>
            );
          }}></FlatList>
      </View>
    );
  }
}

export default class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTypeCategory: [],
      listCategory: [],
      typeID: 1,
    };
  }

  componentDidMount() {
    this.fetchTypeCategory();
    this.fetchCategory();
  }

  fetchTypeCategory = () => {
    getTypeOfCategory()
      .then(results => {
        const new_listTypeCategory = results.map((e, index) => {
          if (e.id == 1) {
            return {
              ...e,
              selected: true,
            };
          }

          return {
            ...e,
            selected: false,
          };
        });

        this.setState({listTypeCategory: new_listTypeCategory});
      })
      .catch(error => {
        this.setState({listTypeCategory: []});
      });
  };

  fetchCategory = () => {
    getCategory(this.state.typeID)
      .then(results => {
        this.setState({listCategory: results});
      })
      .catch(error => {
        this.setState({listCategory: []});
      });
  };

  setTypeID = type_id => {
    getCategory(type_id)
      .then(results => {
        this.setState({listCategory: results, typeID: type_id});
      })
      .catch(error => {
        this.setState({listCategory: []});
      });
  };

  onPressTypeCategory = (item, index) => {
    const new_listTypeCategory = this.state.listTypeCategory.map((e, index) => {
      if (item.id == e.id) {
        return {
          ...e,
          selected: true,
        };
      }

      return {
        ...e,
        selected: false,
      };
    });
    this.setState({listTypeCategory: new_listTypeCategory});
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flexDirection: 'row', backgroundColor: '#FFF'}}>
        <CategoryFlatList
          navigation={navigation}
          listType={this.state.listTypeCategory}
          typeID={this.setTypeID}
          onPressTypeCategory={this.onPressTypeCategory}
        />
        <TypeFlastList
          navigation={navigation}
          listCategory={this.state.listCategory}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CategoryItemSelect: {
    width: 70,
    height: 80,
    backgroundColor: '#fff',
    borderBottomWidth: 0.6,
    borderRightWidth: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  CategoryItemUnSelect: {
    width: 70,
    height: 80,
    backgroundColor: '#E5E5E5',
    borderBottomWidth: 0.6,
    borderRightWidth: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameCategoryItem: {
    color: 'black',
  },

  TypeItem: {
    width: 100,
    alignItems: 'center',
  },

  imageTypeItem: {
    marginTop: 10,
    width: 80,
    height: 80,
  },

  nameTypeItem: {},
});
