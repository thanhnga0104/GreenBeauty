import React from 'react';
import {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

export default class ProvinceComponent extends Component {
  renderOutsideTouchable(onTouch) {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const {navigation} = this.props;
    const {onTouchOutside} = this.props;
    return (
      <View>
        <FlatList
          style={{maxHeight: 200}}
          data={this.props.data}
          renderItem={({item, index}) => {
            return (
              <ProvinceFlatListItem
                navigation={navigation}
                item={item}
                index={index}
                province_id={this.props.province_id}
              />
            );
          }}
        />
      </View>
    );
  }
}

class ProvinceFlatListItem extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity style={{height: 30}}>
        <Text>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}
