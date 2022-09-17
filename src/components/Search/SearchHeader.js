import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SearchHeader({navigation, search}) {
  const [query, setQuery] = useState(null);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.backContainer}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="#7D7D7D"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={styles.searchContainer}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              marginHorizontal: 10,
              alignSelf: 'center',
            }}>
            <FontAwesome name="search" size={14} color="#7D7D7D" />
          </View>
          <View
            style={{
              alignContent: 'center',
              width: '85%',
            }}>
            <TextInput
              value={query}
              style={styles.inputText}
              placeholder="Tìm sản phẩm, thương hiệu, ...?"
              onChangeText={text => {
                search(text), setQuery(text);
              }}></TextInput>
          </View>
        </View>
        {query ? (
          <TouchableOpacity style={styles.clearView}>
            <MaterialIcons
              name="clear"
              size={20}
              color="#7D7D7D"
              onPress={() => search(setQuery(null))}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.clearView} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    flex: 1,
    height: 35,
    marginRight: 20,
    borderRadius: 4,
    borderWidth: 0.3,
    justifyContent: 'space-between',
  },

  backContainer: {
    marginHorizontal: 10,
    alignSelf: 'center',
  },

  inputText: {
    paddingVertical: 4,
    fontSize: 14,
  },

  clearView: {
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
  },
});
