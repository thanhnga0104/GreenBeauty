import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import CategoryComponent from '../../components/Category/CategoryComponent';
import CategoryHeader from '../../components/Category/CategoryHeader';

export default class CategoryScreen extends Component {
  render(){
  const {navigation}=this.props;
  return (
    <SafeAreaView >
      <CategoryHeader navigation={navigation}/> 
      <CategoryComponent navigation={navigation}/>
    </SafeAreaView>
  );
}
};


