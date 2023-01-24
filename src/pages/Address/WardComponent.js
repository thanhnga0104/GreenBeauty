import React, {Component} from 'react';

import {FlatList, View, Text, TouchableOpacity, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getWard} from '../../services';

export default class WardComponent extends Component {
  constructor() {
    super();
    this.state = {
      wardData: [],
      filterWard: [],
      selectedWard: [],
      focus: false,
    };
  }
  componentDidMount() {
    this.fetchDataWard();
  }
  fetchDataWard = () => {
    getWard(this.props.city.id, this.props.district.id)
      .then(wards => {
        this.setState({wardData: wards});
      })
      .catch(error => {
        this.setState({wardData: []});
      });
  };

  handleSelect(text) {
    if (text) {
      const newData = this.state.wardData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({filterWard: newData});
    } else if (text == '') {
      this.setState({filterWard: this.state.wardData});
    }
  }

  setSelectedWard = ward => {
    this.setState({selectedWard: ward});
  };

  hideData = text => {
    this.setState({filterWard: text});
  };

  setFocus = event => {
    this.setState({focus: !event});
  };
  render() {
    const {navigation, name, ward} = this.props;
    return (
      <View>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => {
            this.fetchDataWard(),
              this.setState({filterWard: this.state.wardData});
          }}>
          <TextInput
            value={this.state.selectedWard.name}
            placeholder={name}
            onChangeText={text => {
              this.handleSelect(text);
            }}></TextInput>
          <AntDesign
            style={{alignSelf: 'center'}}
            name="down"
            size={14}
            color="black"
          />
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 0.3,
            borderColor: 'black',
          }}
        />

        <FlatList
          data={this.state.filterWard}
          renderItem={({item, index}) => {
            return (
              <FlatListItem
                navigation={navigation}
                item={item}
                index={index}
                selectedWard={this.setSelectedWard}
                hide={this.hideData}
                ward={ward}
              />
            );
          }}
        />
      </View>
    );
  }
}

class FlatListItem extends Component {
  render() {
    const {navigation, selectedWard, hide, ward} = this.props;
    return (
      <TouchableOpacity
        style={{marginLeft: 10, marginTop: 10}}
        onPress={() => {
          selectedWard(this.props.item), hide('');
          ward(this.props.item);
        }}>
        <Text style={{fontSize: 16, margin: 5}}>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}
