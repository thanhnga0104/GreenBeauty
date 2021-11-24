import React from 'react';
import {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getProvince} from '../../networking/Server';

const EmptyComponent = () => {
  return (
    <View>
      <Text
        style={{
          height: height * 0.8,
          textAlignVertical: 'center',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '600',
        }}>
        Dữ liệu không tồn tại. Hãy thử lại sau.{' '}
      </Text>
    </View>
  );
};

export default class GetProvince extends Component {
 
  //   renderOutsideTouchable(onTouch) {
  //     const view = <View style={{flex: 1, width: '100%'}} />;
  //     if (!onTouch) return view;

  //     return (
  //       <TouchableWithoutFeedback
  //         onPress={onTouch}
  //         style={{flex: 1, width: '100%'}}>
  //         {view}
  //       </TouchableWithoutFeedback>
  //     );
  //   }

  constructor() {
    super();
    this.state = {
      provinceData: [],
      // filterProvince: [],
      // selectProvince: '',
      province: '',
      // province_id: '',
    };
    
  }

  //======================================
  componentDidMount() {
    this.refreshProvinceFromServer();
  }
  refreshProvinceFromServer = () => {
    getProvince()
      .then(provinces => {
        this.setState({provinceData: provinces});
      })
      .catch(error => {
        this.setState({provinceData: []});
      });
  };
  // setProvince = pro => {
  //   console.log('có chạy vô setProvince', pro);
  //   this.setState({province: pro});
  // };

  render() {
    const {navigation, route} = this.props;
   
    // console.log("có chạy vô đây ko handle:", route.params.handle)
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#316C49" barStyle="light-content" />
        <View style={styles.headerContainer}>
          <View style={styles.backContainer}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>

          <View>
            <Text
              style={{
                flex: 1,
                color: '#fff',
                marginLeft: 8,
                fontSize: 16,
                fontWeight: '600',
                textAlignVertical: 'center',
              }}>
              Địa chỉ nhận hàng
            </Text>
          </View>
        </View>
        <View
          style={{
            // width: width,
            // height: height,
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={this.state.provinceData}
            ListEmptyComponent={EmptyComponent}
            renderItem={({item, index}) => {
              return (
                <ProvinceFlatListItem
                  navigation={navigation}
                  item={item}
                  index={index}
                  handle={route.params.handle}
                  
                  
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

class ProvinceFlatListItem extends Component {
 
  render() {
    const {navigation,handle} = this.props;
// console.log("log cái nữa nè:", handle)
    return (
      <TouchableOpacity
        style={{marginLeft: 15, marginTop: 10}}
        onPress={() => {
          this.setProvince(this.props.item.name),
          navigation.navigate('AddressReceiveScreen'
          )     
          // console.log("handle có gì: ",handle)      
           
        }}>
        <Text style={{fontSize: 16, margin: 10}}>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#316C49',
  },

  backContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
