import {
  View,
  Button,
  StyleSheet,
  SafeAreaView
} from 'react-native'
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
      <View style={styles.topContainer}>
        <Toggle value={isEnabled} onValueChange={toggle} />
        <Button title="Scan" onPress={() => {
          discoverUnpaired();
          listDevices();
        }} />
      </View>
      <DeviceContainer listDevices={allDevices} unpairedDevices={unpairedDevices} isEnabled={isEnabled} image={require('../../assets/sad.png')} />
      <SafeAreaView style={styles.bottomContainer}>
        <View style={styles.deviceContainer}>
          <Button title="Start chat" onPress={startChat} />
        </View>
        <View style={styles.deviceContainer}>
          <Button title="Disconnect" onPress={disconnect} />
        </View>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    height: '15%',
  },
  deviceContainer: {
    paddingTop: 10,
  },
  bottomContainer: {
    width: '100%',
  }
})

export default BluetoothList
