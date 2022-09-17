import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const IngredientComponent = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 3.84,
        elevation: 25,
        shadowColor: 'black',
      }}>
      <View style={styles.ingredientcontaner}>
        <View style={(styles.box, getStyle(props.level))}>
          <Text style={{color: '#FFF'}}>{props.level}</Text>
        </View>
        <View>
          <Text>{props.name}</Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{width: Dimensions.get('window').width * 0.6}}>
            {props.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

function getStyle(val) {
  if (val > 3)
    return {
      backgroundColor: '#1627D0',
      opacity: 0.8,
      height: Dimensions.get('window').height / 24,
      width: Dimensions.get('window').height / 24,
      alignItems: 'center',
      justifyContent: 'center',
    };
  else if (val == 3)
    return {
      backgroundColor: '#C7CB14',
      height: Dimensions.get('window').height / 24,
      width: Dimensions.get('window').height / 24,
      alignItems: 'center',
      justifyContent: 'center',
    };
  else
    return {
      backgroundColor: '#D7375E',
      height: Dimensions.get('window').height / 24,
      width: Dimensions.get('window').height / 24,
      alignItems: 'center',
      justifyContent: 'center',
    };
}
const styles = StyleSheet.create({
  box: {
    height: Dimensions.get('window').height / 24,
    width: Dimensions.get('window').height / 24,
    backgroundColor: 'blue',
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ingredientcontaner: {
    flexDirection: 'row',
    height: Dimensions.get('window').height / 9,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#B0B6E9',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default IngredientComponent;
