import * as React from 'react';
import { Pressable, StyleSheet, ScrollView, Dimensions, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SeatScreen from './Seat.js';
import MenuScreen from './Menu.js';
import PayScreen from './Pay.js';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleName}>식당 리스트</Text>
      </View>
      <ScrollView style={styles.storeList}>
        <Pressable onPress={() => navigation.navigate('Seat')} style={styles.store}>
        {({pressed}) => (<Text style={styles.storeName}>A식당</Text>)}
        </Pressable>
        <View style={styles.store}>
          <Text style={styles.storeName}>B식당</Text>
        </View>
        <View style={styles.store}>
          <Text style={styles.storeName}>C식당</Text>
        </View>
        <View style={styles.store}>
          <Text style={styles.storeName}>D식당</Text>
        </View>
        <View style={styles.store}>
          <Text style={styles.storeName}>E식당</Text>
        </View>
        <View style={styles.store}>
          <Text style={styles.storeName}>F식당</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Seat" component={SeatScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    height: "15%",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  titleName: {
    fontSize: 50,
    fontWeight: "500",
  },
  storeList: {
    backgroundColor: "blue",
  },
  store: {
    width: SCREEN_WIDTH,
  },
  storeName: {
    fontSize: 130,
    fontWeight: "300",
  },
});

export default App;