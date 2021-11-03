import React, {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import HomeCircleSection from '../../components/Home/HomeCircleSection';
import HomeHeader from '../../components/Home/HomeHeader';
import HomeDealSection from '../../components/Home/HomeDealSection';
import HomeRecommendSection from '../../components/Home/HomeRecommendSection';

export default class HomeScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          // paddingTop: StatusBar.currentHeight
        }}>
        <StatusBar backgroundColor="#316C49" barStyle="light-content" />
        <HomeHeader navigation={navigation} />
<View style={{flex:1}}>
        <ScrollView style={styles.bodyContainer} >
          {/* <HomeCircleSection navigation={navigation} />
          <HomeDealSection navigation={navigation} /> */}
          <View>
            <HomeCircleSection navigation={navigation} />
          </View>
          <View>
            <HomeDealSection navigation={navigation} />
          </View>
          <View>
            <HomeRecommendSection navigation={navigation}/>
          </View>
         
        </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    // flex: 1,
    backgroundColor: '#E5E5E5',
  },
});
