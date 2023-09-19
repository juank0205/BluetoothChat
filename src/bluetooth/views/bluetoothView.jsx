import {
  View,
  Button,
} from 'react-native'
import { useEffect } from 'react';


// Components
import Layout from '../components/bluetoothList'
import Toggle from '../components/toggle'
import useBle from '../viewModels/useBle'
import DeviceContainer from '../components/deviceListContainer'

function BluetoothList(props) {
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
    isConnected } = useBle();

  useEffect(() => {
    const startBluetooth = async () => {
      await requestPermissions((isGranted) => {
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
      <DeviceContainer listDevices={allDevices} unpairedDevices={unpairedDevices} isEnabled={isEnabled} image={require('../../assets/sad.png')}/>
    </Layout>
  );
}

export default BluetoothList
