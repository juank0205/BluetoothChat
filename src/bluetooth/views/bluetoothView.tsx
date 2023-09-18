import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Alert,
  Button,
} from 'react-native'


// Components
import Layout from '../components/bluetoothList'
import Empty from '../components/empty'
import Toggle from '../components/toggle'
import Subtitle from '../components/subtitle'
import Device from '../components/device'
import useBle from '../viewModels/useBle'


function BluetoothList(props: any) {

  const [blEnable, setBlEnable] = useState(false);

  const { requestPermissions, allDevices, unpairedDevices, discoverUnpaired, listDevices } = useBle();

  useEffect(() => {
    const startBluetooth = async () => {
      requestPermissions((isGranted: boolean) => {
        if (isGranted) {
          // listDevices();
          discoverUnpaired();
        }
      })
    }
    startBluetooth();
  }, [])

  const renderEmpty = () => <Empty text='No available devices' />
  const renderItem = ({ item }: any) => {
    return <Device {...item} onPress={()=>{console.log(item.id)}} iconRight={require('../../assets/setting.png')} iconLeft={require('../../assets/responsive.png')} />
  }

  return (
    <Layout title="Bluetooth">
      <Toggle />
      <Button title="Scan" onPress={discoverUnpaired}/>
      <Subtitle title="Devices found" />
      <FlatList
        data={unpairedDevices}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
    </Layout>
  );
}

export default BluetoothList
