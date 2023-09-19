import {
  View,
  Button,
  Text
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { useEffect } from 'react';


// Components
import Layout from '../components/bluetoothList'
import Toggle from '../components/toggle'
import useBle from '../viewModels/useBle'
import DeviceContainer from '../components/deviceListContainer'

function BluetoothList({ navigation }) {
  const { isEnabled,
    allDevices,
    unpairedDevices,
    setUnpairedDevices,
    setAllDevices,
    requestPermissions,
    listDevices,
    discoverUnpaired,
    toggle,
    syncToggle,
    isConnected,
    disconnect,
    connected,
    syncIsConnected } = useBle();

  useEffect(() => {
    const startBluetooth = async () => {
      await requestPermissions((isGranted) => {
        if (isGranted) {
          setUnpairedDevices([]);
          setAllDevices([]);
          syncIsConnected();
          syncToggle();
          listDevices();
          discoverUnpaired();

        }
      })
    }
    startBluetooth();
  }, [])

  const startChat = async () => {
    console.log(connected);
    console.log(await isConnected())
    if (await isConnected()) {
      navigation.navigate('Chat')
    }
  }

  return (
    <Layout>
      <View style={{ height: '20%' }}>
        <Toggle value={isEnabled} onValueChange={toggle} />
        <Button title="Scan" onPress={() => {
          discoverUnpaired();
          listDevices();
        }} />
      </View>
      <DeviceContainer listDevices={allDevices} unpairedDevices={unpairedDevices} isEnabled={isEnabled} image={require('../../assets/sad.png')} />
      <View style={{ paddingTop: 10, }}>
        <Button title="Start chat" onPress={startChat} />
      </View>
      <View style={{ paddingTop: 10, }}>
        <Button title="Disconnect" onPress={disconnect} />
      </View>
    </Layout>
  );
}

export default BluetoothList
