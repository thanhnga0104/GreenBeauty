import React, {Component} from 'react';
import {FlatList, View, Text, TouchableOpacity, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getProvince} from '../../services';

export default class CityComponent extends Component {
  constructor() {
    super();
    this.state = {
      cityData: [],
      filterCity: [],
      selectedCity: [],
      isSelect: '',
      focus: false,
    };
  }
  componentDidMount() {
    this.fetchDataCity();
  }
  fetchDataCity = () => {
    getProvince()
      .then(cities => {
        this.setState({cityData: cities});
      })
      .catch(error => {
        this.setState({cityData: []});
      });
  };

  handleSelect(text) {
    if (text) {
      const newData = this.state.cityData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({filterCity: newData});
    } else if (text == '') {
      this.setState({filterCity: this.state.cityData});
    }
  }

  setSelectedCity = city => {
    this.setState({selectedCity: city});
  };
  hideData = text => {
    this.setState({filterCity: text});
  };
  setFocus = event => {
    this.setState({focus: !event});
  };
  onBlur = value => {
    this.setState({filterCity: []});
    value = this.state.selectedCity.name;
  };
  render() {
    const {navigation, name, city, district, ward} = this.props;
    return (
      <View>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={this.state.selectedCity.name}
            placeholder={name}
            onFocus={() =>
              this.setState({filterCity: this.state.cityData, selectedCity: []})
            }
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
          data={this.state.filterCity}
          renderItem={({item, index}) => {
            return (
              <FlatListItem
                navigation={navigation}
                item={item}
                index={index}
                selectedCity={this.setSelectedCity}
                hide={this.hideData}
                city={city}
                district={district}
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
    const {navigation, selectedCity, hide, city, district, ward} = this.props;
    return (
      <TouchableOpacity
        style={{marginLeft: 10, marginTop: 10}}
        onPress={() => {
          selectedCity(this.props.item),
            hide(''),
            city(this.props.item),
            district([]),
            ward([]);
        }}>
        <Text style={{fontSize: 16, margin: 5}}>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}
