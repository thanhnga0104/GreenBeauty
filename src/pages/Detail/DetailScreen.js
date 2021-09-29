import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import DetailHeader from '../../components/Detail/DetailHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DetailScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        //  paddingTop: StatusBar.currentHeight
      }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <DetailHeader navigation={navigation} />

      {/* Bắt đầu phần detail */}
      <ScrollView>
        <Image
          style={styles.image}
          source={require('../../assets/image/img2.jpg')}></Image>
        <View style={styles.productNameSection}>
          <Text style={styles.productNameText}>
            Chỗ này là ghi cái tên sản phẩm dài dài vô nè
          </Text>
          <Text style={styles.productPrice}>200,000đ</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 10, width: '100%'}}>
          <TouchableOpacity style={{marginRight: 10}}>
            <Text>Đánh giá</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Hỏi đáp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartContainer}>
            <EvilIcons name="heart" size={32} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareContainer}>
            <Icon name="share-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.khoangcach}></View>
        
        {/* Mô tả sản phẩm */}
        <TouchableOpacity 
        style={{flexDirection: 'row', alignItems:'center'}} 
         activeOpacity={1}>
          <View style={styles.descriptionSection}>
            <Text style={styles.titleText}>Mô tả sản phẩm</Text>
            <Text numberOfLines={5} >
              Sữa Chống Nắng Anessa Dưỡng Da Bảo Vệ Hoàn Hảo là một trong những
              sản phẩm chống nắng được yêu thích hàng đầu tại Nhật Bản đến từ
              thương hiệu Anessa. Với bộ ba công nghệ độc quyền từ Shiseido,
              Anessa Perfect UV Sunscreen Skincare Milk cung cấp khả năng chống
              nắng vượt trội nhiều giờ liền, bảo vệ da tối ưu khỏi tác hại từ
              tia UV. Đồng thời, công thức chứa 50% thành phần dưỡng da giúp đẩy
              lùi các dấu hiệu lão hóa hiệu quả. Đặc biệt, sản phẩm có kết cấu
              sữa mỏng nhẹ, thấm nhanh, không nhờn rít, rất thích hợp dùng cho
              những hoạt động ngoài trời hay đi chơi, du lịch, công tác.
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <EvilIcons name="chevron-right" size={30} color="black" />
          </View>
        </TouchableOpacity>

        {/* End Mô tả sản phẩm */}

        {/* Thông tin chi tiết */}

        <View style={styles.khoangcach}></View>
        <View style={styles.descriptionSection}>
          <Text style={styles.titleText}>Thông tin chi tiết</Text>
          <Text style={styles.infoText}>Thương hiệu</Text>
          <Text style={styles.infoText}>Xuất xứ thương hiệu</Text>
          <Text style={styles.infoText}>Nơi sản xuất</Text>
          <Text style={styles.infoText}>Loại da</Text>
        </View>

        {/* End Thông tin chi tiết */}

        {/* Hướng dẫn sử dụng */}
        <View style={styles.khoangcach}></View>

        <TouchableOpacity style={{padding:10, flexDirection:'row'}}>
          <Text style={styles.titleText}>Hướng dẫn sử dụng</Text>
          <View style={styles.rightContainer}>
            <EvilIcons name="chevron-right" size={30} color="black" />
          </View>
        </TouchableOpacity>

        {/* end Hướng dẫn sử dụng */}
        <View style={styles.khoangcach}></View>
        <TouchableOpacity style={{padding:10, flexDirection:'row'}}>
          
          <Text style={styles.titleText}>Thành phần sản phẩm</Text>
         
          <View style={styles.rightContainer}>
            <EvilIcons name="chevron-right" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.khoangcach}></View>

        <View>
          <Text>Đánh giá</Text>
        </View>
      </ScrollView>

     
        <View style={styles.addCartContainer}>
          
        <TouchableOpacity style={styles.addCartButton} >  
          <Text style={styles.addCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        </View>
      
    </SafeAreaView>
  );
};
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
    height: 350,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },

  productNameSection: {
    padding: 10,
    fontSize: 16,
    fontWeight: '700',
  },

  productNameText: {
    fontSize: 16,
    fontWeight: '700',
  },

  productPrice: {
    color: 'red',
    fontSize: 18,
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 50,
    marginTop: 8,
  },
  shareContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    marginTop: 4,
  },

  descriptionSection: {    
    justifyContent: 'center',    
    height: 120,
    padding: 10,    
    width:width/1.07,
    
  },
  titleText: {  
    width:width/1.1,
    fontSize: 14,
    fontWeight: '700',
    flexWrap: 'wrap',
    
  },  

  rightContainer: {    
    alignItems:'center',
    justifyContent:'center',
  },

  khoangcach: {
    padding: 4,
    backgroundColor: '#E5E5E5',
  },
 
  infoText: {
    marginLeft: 8,
    fontSize: 14,    
    fontWeight: '300',
  },
  
  addCartContainer:
  {
    borderWidth:0.3, 
    height:60,
    alignItems:'center',
    justifyContent:'center',
  },

  addCartButton:{
    // marginHorizontal:20,
    //  width:'100%',
    paddingHorizontal:width/4,
    backgroundColor:'green',
    height:height/16, 
    alignItems:'center', 
    justifyContent:'center', 
    borderRadius:5,
    
  },
  addCartText:{
    fontSize:22,
    color:'#fff',
  }
});

export default DetailScreen;
