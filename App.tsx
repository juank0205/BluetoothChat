/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BluetoothList from './src/bluetooth/views/bluetoothView';
import Chat from './src/bluetooth/views/chat';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={BluetoothList}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
