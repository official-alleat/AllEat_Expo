import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import StoreScreen from "./Store.js";
import SeatScreen from "./Seat.js";
import MenuScreen from "./Menu.js";
import PayScreen from "./Pay.js";
import CartScreen from "./Cart.js";

import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Store' component={StoreScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Seat' component={SeatScreen} options={{ title: '좌석 예약하기' }}/>
          <Stack.Screen name='Menu' component={MenuScreen} options={{ title: '메뉴 고르기' }}/>
          <Stack.Screen name='Cart' component={CartScreen} options={{ title: '장바구니' }}/>
          <Stack.Screen name='Pay' component={PayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
