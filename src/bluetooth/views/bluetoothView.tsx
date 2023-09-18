import React, { useEffect } from 'react'
import {
  View,
  Button,
} from 'react-native'


// Components
import Layout from '../components/bluetoothList'
import Toggle from '../components/toggle'
import useBle from '../viewModels/useBle'
import DeviceContainer from '../components/deviceListContainer'

function BluetoothList(props: any) {
  const { requestPermissions,
    discoverUnpaired,
    listDevices,
    isConnected,
    setUnpairedDevices,
    setAllDevices,
    isEnabled,
    toggle,
    syncToggle } = useBle();

  useEffect(() => {
    const startBluetooth = async () => {
      requestPermissions((isGranted: boolean) => {
        if (isGranted) {
          setUnpairedDevices([]);
          setAllDevices([]);
          syncToggle();
          listDevices();
          discoverUnpaired();
        }
      })
    }
    startBluetooth();
  }, [])

  return (
    <Layout title="Bluetooth">
      <View style={{ height: '25%' }}>
        <Toggle value={isEnabled} onValueChange={toggle} />
        <Button title="Scan" onPress={() => {
          discoverUnpaired();
          listDevices();
        }} />
        <View style={{ paddingTop: 10 }}>
          <Button title="Start chat" onPress={isConnected} />
        </View>
      </View>
      <DeviceContainer />
    </Layout>
  );
}

export default BluetoothList
