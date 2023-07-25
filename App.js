import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StoreScreen from './Store.js';
import SeatScreen from './Seat.js';
import MenuScreen from './Menu.js';
import PayScreen from './Pay.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="Seat" component={SeatScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}