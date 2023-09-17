import React from 'react'
import {
	View,
	Text,
	FlatList,
} from 'react-native'

import Layout from '../components/bluetoothListLayout'
import Empty from '../components/Empty'
import Toggle from '../components/toggle'

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
	const renderEmpty = () => <Empty text='No hay dispositivos'/>

	return (
		<Layout title="Bluetooth">
			<Toggle/>		
			<FlatList
				data={list}
				ListEmptyComponent={renderEmpty}
				renderItem={({item}) => <Text style={{ fontSize: 20 }}>{item.name}</Text>}
			/>
		</Layout>
	);
}

export default BluetoothList
