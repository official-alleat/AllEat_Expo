import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Dimensions, Button, View, Text, TextInput } from 'react-native';
import stores from './stores.js';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function StoreScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const filteredStores = Object.values(stores).filter((store) =>
    store.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleName}>올잇.</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="가게 이름 검색"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <ScrollView style={styles.storeList}>
        {filteredStores.map((store) => (
        <View key={store.id} style={styles.storeCell}>
          <View style={styles.storeDescription}>
            <Image style={styles.storeImage} source={{ uri: store.image }}/>
            <View>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeTag}>{store.tag}</Text>
              <Text style={styles.storeLocation}>{store.location}</Text>
            </View>
          </View>

          <View style={styles.storeButton}>
            <Button title="잔여좌석 확인" color='#D0A9F5' onPress={() => navigation.navigate('Seat', { storeId: store.id })}/>
          </View>
        </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    titleContainer: {
      height: '10%',
      padding: 10,
      backgroundColor: '#8B00FF',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    titleName: {
      fontSize: 30,
      fontWeight: '700',
      color: 'white',
    },
    searchInput: {
      height: 40,
      borderWidth: 1,
      borderColor: '#DEDEDE',
      borderRadius: 7,
      paddingHorizontal: 10,
      margin: 10,
    },
    storeList: {
      backgroundColor: 'white',
      width: SCREEN_WIDTH,
    },
    storeCell: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 7,
      margin: 5,
      // Shadow properties for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowColor: 'black',
      // Elevation for Android (comment this out if you're using iOS shadow properties)
      elevation: 3,
    },
    storeDescription: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    storeImage: {
      width: 60,
      height: 60,
      margin: 5,
      borderRadius: 7,
    },
    storeName: {
      fontSize: 22,
      fontWeight: '500',
    },
    storeTag: {
    },
    storeLocation: {
    },
    storeButton: {
      marginRight: 5,
    },

  });
  