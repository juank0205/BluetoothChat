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

  const { requestPermissions,
    allDevices,
    unpairedDevices,
    discoverUnpaired,
    listDevices,
    isConnected,
    setUnpairedDevices,
    setAllDevices,
    connect,
    disconnect,
    write} = useBle();

  useEffect(() => {
    const startBluetooth = async () => {
      requestPermissions((isGranted: boolean) => {
        if (isGranted) {
          setUnpairedDevices([]);
          setAllDevices([]);
          listDevices();
          discoverUnpaired();
        }
      })
    }
    startBluetooth();
  }, [])

  const renderEmpty = () => <Empty text='No available devices' />
  const renderItem = ({ item }: any) => {
    return <Device {...item} onPress={() => { connect(item.id) }}
      iconRight={require('../../assets/setting.png')}
      iconLeft={require('../../assets/responsive.png')} />
  }

  return (
    <Layout title="Bluetooth">
      <Toggle />
      <Button title="Scan" onPress={discoverUnpaired} />
      <View style={{ paddingTop: 10 }}>
        <Button title="Start chat" onPress={isConnected} />
      </View>
      <View style={{ paddingTop: 10 }}>
        <Button title="Disconnect" onPress={disconnect} />
      </View>
      <View style={{ paddingTop: 10 }}>
        <Button title="Write" onPress={() => write("Soy la cosa mas insana de este planeta")} />
      </View>
      <Subtitle title="Devices Paired" />
      <FlatList
        data={allDevices}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
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
