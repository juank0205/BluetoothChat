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
import Device from '../components/device'

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
	const renderItem = ({item}) => {
		return <Device {...item} iconRight={require('../../assets/setting.png')} iconLeft={require('../../assets/responsive.png')}/>
	}

	return (
		<Layout title="Bluetooth">
			<Toggle/>		
			<Subtitle title="Devices found"/>	
			<FlatList
				data={list}
				ListEmptyComponent={renderEmpty}
				renderItem={renderItem}
			/>
		</Layout>
	);
}

export default BluetoothList
