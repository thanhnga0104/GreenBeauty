import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';


const HomeProductSection  = ({navigation}) =>{
  
     const ProductItem = ({image, name, price, details}) => (    
      <View style={styles.itemContainer}>
        <TouchableOpacity 
         onPress={()=>{navigation.navigate('DetailScreen');}}
        >
        <Image source={image} style={styles.itemImage} />
        <Text style={styles.itemPrice}>{price}</Text>
        <Text style={styles.itemName}>{name}</Text>
        <Text numberOfLines={2}> {details}</Text>      
        </TouchableOpacity>
      </View>
    );
  
      return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTile}>DEALS ĐANG DIỄN RA</Text>
            <View style={{backgroundColor:'green', padding: 8, borderRadius:12}}> 
            <ScrollView horizontal={true}>
              <View style={styles.listItemContainer}>
                <ProductItem
                  name="SILCOT"
                  image={require('../../assets/image/img1.jpg')}
                  price="29000"
                  details="Bông tẩy trang silcot"
                  
                  
                />
                <ProductItem
                  name="SILCOT"
                  image={require('../../assets/image/img1.jpg')}
                  price="29000"
                  details="Bông tẩy trang silcot"
                />
                <ProductItem
                  name="SILCOT"
                  image={require('../../assets/image/img1.jpg')}
                  price="29000"
                  details="Bông tẩy trang silcot"
                />
                <ProductItem
                  name="SILCOT"
                  image={require('../../assets/image/img1.jpg')}
                  price="29000"
                  details="Bông tẩy trang silcot"
                />
              </View>
            </ScrollView>
            </View>
          </View>
      );
    
  };
const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 12,
      },
    
      sectionTile: {
        fontWeight: '700',
        fontSize: 16,
        color: '#2f2f2f',
        marginVertical: 12,
      },
    
      listItemContainer: {
        //   padding:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor:'green',
      },
    
      itemContainer: {
        width: 100,
        backgroundColor: '#fff',
        // padding:4
        marginRight: 2,
        // marginTop: 10,
        
      },
    
      itemImage: {
        borderRadius: 8,
        width: 100,
        height: 100,
      },
      itemName: {
        fontSize: 14,
        color: '#484848',
        marginVertical: 4,
      },
    
      itemPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FF5F04',
      },

      
});

export default HomeProductSection;