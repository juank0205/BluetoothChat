import React from 'react'
import {
	View,
	Text,
	FlatList,
} from 'react-native'
import Layout from '../components/bluetoothListLayout'

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

	return (
		<Layout title="Bluetooth">
			<FlatList
				data={list}
				renderItem={({item}) => <Text style={{ fontSize: 20 }}>{item.name}</Text>}
			/>
		</Layout>
	);
}

export default BluetoothList
