import React from 'react'
import {
	View,
	Text,
	FlatList,
} from 'react-native'

// Components
import Layout from '../components/bluetoothList'
import Empty from '../components/empty'
import Toggle from '../components/toggle'
import Subtitle from '../components/subtitle'

//Libraries
import BluetoothSerial from 'react-native-bluetooth-serial-next'

function BluetoothList(props) {
	const list = [
		{
			name: 'Cristhian',
			key: '1',
		},
		{
			name: 'Añañai',
			key: '2',
		}
	]
	const renderEmpty = () => <Empty text='No available devices'/>

	return (
		<Layout title="Bluetooth">
			<Toggle/>		
			<Subtitle title="Devices found"/>	
			<FlatList
				data={list}
				ListEmptyComponent={renderEmpty}
				renderItem={({item}) => <Text style={{ fontSize: 20 }}>{item.name}</Text>}
			/>
		</Layout>
	);
}

export default BluetoothList
