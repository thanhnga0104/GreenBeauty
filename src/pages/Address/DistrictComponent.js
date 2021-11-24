import React, {Component} from 'react';
import {FlatList, View, Text, TouchableOpacity, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDistrict} from '../../networking/Server';

export default class DistrictComponent extends Component {
  constructor() {
    super();
    this.state = {
      districtData: [],
      filterDistrict: [],
      selectedDistrict: [],
      focus: false,
    };
  }

  componentDidMount() {
    this.fetchDataDistrict();
  }

  fetchDataDistrict = () => {
    getDistrict(this.props.city.id)
      .then(districts => {
        this.setState({districtData: districts});
      })
      .catch(error => {
        this.setState({districtData: []});
      });
  };

  handleSelect(text) {
    if (text) {
      const newData = this.state.districtData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({filterDistrict: newData});
    } else if (text == '') {
      this.setState({filterDistrict: this.state.districtData});
    }
  }

  setSelectedDistrict = text => {
    this.setState({selectedDistrict: text});
  };

  hideData = text => {
    this.setState({filterDistrict: []});
  };

  setFocus = event => {
    this.setState({focus: !event});
  };

  render() {
    const {navigation, name, district} = this.props;
    return (
      <View>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => {
            this.fetchDataDistrict(),
              this.setState({filterDistrict: this.state.districtData});
          }}>
          <TextInput
            value={this.state.selectedDistrict.name}
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
          data={this.state.filterDistrict}         
          renderItem={({item, index}) => {
            return (
              <FlatListItem
                navigation={navigation}
                item={item}
                index={index}
                selectedDistrict={this.setSelectedDistrict}
                hide={this.hideData}
                district={district}
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
    const {navigation, selectedDistrict, hide, district} = this.props;
    return (
      <TouchableOpacity
        style={{marginLeft: 10, marginTop: 10}}
        onPress={() => {
          selectedDistrict(this.props.item),
            hide(''),
            district(this.props.item);
        }}>
        <Text style={{fontSize: 16, margin: 5}}>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}
