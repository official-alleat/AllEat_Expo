import * as React from 'react';
import { Image, StyleSheet, ScrollView, Dimensions, Button, View, Text } from 'react-native';

import stores from './stores.json';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

export default function StoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleName}>올잇.</Text>
      </View>

      <ScrollView style={styles.storeList}>
        {Object.values(stores).map((store) => (
        <View key={store.id} style={styles.storeCell}>
          <View style={styles.storeDescription}>
            <Image source={{uri: store.image}} style={styles.storeImage}></Image>
            <View>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeTag}>{store.tag}</Text>
              <Text style={styles.storeLocation}>{store.location}</Text>
            </View>
          </View>
          <View style={{marginRight: 5}}>
            <Button color="#D0A9F5" onPress={() => navigation.navigate('Seat', {storeId: store.id})} title="잔여좌석 확인"></Button>
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
      backgroundColor: '#fff',
    },
    title: {
      height: "10%",
      padding: 10,
      backgroundColor: '#8b00ff',
      justifyContent: "flex-end",
      alignItems: "flex-start",
    },
    titleName: {
      fontSize: 30,
      fontWeight: "700",
      color: "white",
    },
    storeList: {
      backgroundColor: "white",
      width: SCREEN_WIDTH,
    },
    storeCell: {
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
    storeName: {
      fontSize: 22,
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
  