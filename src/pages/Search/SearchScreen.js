import React from 'react';
import {View, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {Component} from 'react';
import SearchHeader from '../../components/Search/SearchHeader';

import {getSearchProduct} from '../../networking/Server';
import SearchComponent from '../../components/Search/SearchComponent';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: [],
      query: [],
      refreshing: true,
    };
  }

  componentDidMount() {
    this.searchProductFromServer();
  }

  searchProductFromServer = () => {
    getSearchProduct(this.state.query)
      .then(product => {
        this.setState({responseData: product});
      })
      .catch(error => {
        this.setState({responseData: []});
      });
  };

  handleSearch = text => {
    this.setState({query: text}, this.searchProductFromServer);
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SearchHeader navigation={navigation} search={this.handleSearch} />
        <SearchComponent
          navigation={navigation}
          data={this.state.responseData}
        />
      </SafeAreaView>
    );
  }
}
