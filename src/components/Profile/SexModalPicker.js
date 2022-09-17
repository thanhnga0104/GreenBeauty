import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const ModalPicker = props => {
  const renderData = ['Male', 'Female'];

  const onPressItem = data => {
    props.ChangeModalVisible(false), props.setdata(data);
  };
  const render = renderData.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}>
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      onPress={() => props.ChangeModalVisible(false)}
      style={styles.container}>
      <View style={[styles.modal, {width: Width - 20}]}>
        <ScrollView>{render}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#A4F5B1',
    borderRadius: 10,
  },
  option: {
    alignItems: 'flex-start',
  },
  text: {
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
const Width = Dimensions.get('window').width;
export default ModalPicker;
