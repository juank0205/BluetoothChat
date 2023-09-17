import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
} from 'react-native'

import { PERMISSIONS, requestMultiple } from 'react-native-permissions'

// Components
import Layout from '../components/bluetoothList'
import Empty from '../components/empty'
import Toggle from '../components/toggle'
import Subtitle from '../components/subtitle'
import Device from '../components/device'

//Libraries
import { BleManager } from 'react-native-ble-plx'
import useBle from '../viewModels/useBle'
export const manager = new BleManager();

function BluetoothList(props: any) {

  const [devices, setDevices] = useState([]);
  const [blEnable, setBlEnable] = useState(false);

  const { requestPermissions } = useBle();

  useEffect(() => {
    const startBluetooth = async () => {
      requestPermissions((isGranted: boolean) => {
        console.log('The Android permission is Granted? ' + isGranted);
      })
    }
    startBluetooth();
  }, [])

  const renderEmpty = () => <Empty text='No available devices' />
  const renderItem = ({ item }: any) => {
    return <Device {...item} iconRight={require('../../assets/setting.png')} iconLeft={require('../../assets/responsive.png')} />
  }

  return (
    <Layout title="Bluetooth">
      <Toggle />
      <Subtitle title="Devices found" />
      <FlatList
        data={devices}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
    </Layout>
  );
}

export default BluetoothList
