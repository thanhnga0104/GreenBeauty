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
      <StatusBar backgroundColor="#316C49" barStyle="light-content" />
      <SearchHeader navigation={navigation}/>
      
    </SafeAreaView>

);
};
export default SearchScreen;
