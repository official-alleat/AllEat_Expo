import * as React from 'react';
import { Image, StyleSheet, ScrollView, Dimensions, Button, View, Text } from 'react-native';

import stores from './stores.json';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

export default function StoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleName}>식당 리스트</Text>
      </View>
      <ScrollView style={styles.storeList}>
        {Object.values(stores).map((store) => (
        <View style={styles.storeCell}>
          <View style={styles.storeDescription}>
            <Image source={{uri: store.image}} style={styles.storeImage}></Image>
            <View>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeTag}>{store.tag}</Text>
              <Text style={styles.storeLocation}>{store.location}</Text>
            </View>
          </View>
          <Button onPress={() => navigation.navigate('Seat', {storeId: store.id})} title="잔여좌석 확인"></Button>
        </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      height: "7%",
      padding: 10,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    titleName: {
      fontSize: 30,
      fontWeight: "500",
    },
    storeList: {
      backgroundColor: "white",
      width: SCREEN_WIDTH,
    },
    storeCell: {
      backgroundColor: "#e9ecef",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 7,
      margin: 5,
    },
    storeName: {
      fontSize: 30,
      fontWeight: "500",
    },
    storeImage: {
      width: 60,
      height: 60,
      margin: 5,
      borderRadius: 7,
    },
    storeTag: {
  
    },
    storeDescription: {
      flexDirection: "row",
      alignItems: "center",
    },
    storeButton: {
  
    },
    storeLocation: {

    },
  });
  