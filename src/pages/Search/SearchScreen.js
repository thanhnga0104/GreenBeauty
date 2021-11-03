import React from "react";
import {View,StatusBar,StyleSheet, SafeAreaView} from 'react-native'
import SearchHeader from "../../components/Search/SearchHeader";

const SearchScreen=({navigation})=>{
return(
<SafeAreaView
      style={{
        flex: 1,
        // paddingTop: StatusBar.currentHeight
      }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <SearchHeader navigation={navigation}/>
      
    </SafeAreaView>

);
};
export default SearchScreen;
