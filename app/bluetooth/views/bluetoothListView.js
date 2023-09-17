import React from 'react'
import {
	View,
	Text,
	FlatList,
} from 'react-native'

function BluetoothListView(props) {
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
		<FlatList
			data={list}
			renderItem={({ item }) => <Text style={{fontSize:20}}>{item.name}</Text>}
		/>
	)
}

export default BluetoothListView
