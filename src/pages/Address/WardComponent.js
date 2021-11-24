import React, {Component} from 'react';

import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDistrict} from '../../networking/Server';
import { getWard } from '../../networking/Server';

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
    getWard(this.props.city_id, this.props.district_id)
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

  setSelectedWard = text => {
    this.setState({selectedWard: text});
  };

  hideData = text => {
    this.setState({filterWard: []});
  };

  setFocus = event => {
    this.setState({focus: !event});
  };
  render() {
    const {navigation, name, district_id} = this.props;
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
                district_id={district_id}
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
    const {navigation, selectedWard, hide, district_id} = this.props;
    return (
      <TouchableOpacity
        style={{marginLeft: 10, marginTop: 10}}
        onPress={() => {
          selectedWard(this.props.item),
            hide('');
            // district_id(this.props.item.id);
        }}>
        <Text style={{fontSize: 16, margin: 5}}>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}
