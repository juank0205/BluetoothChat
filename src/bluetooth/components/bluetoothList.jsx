import React from "react";
import{
	View,
	Text,
	StyleSheet
} from 'react-native'

function BluetoothList(props){
	return(
		<View style={styles.container}>
			{props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		paddingHorizontal: 20,
		paddingVertical: 25,
		backgroundColor: '#f5fcff'
	},
	title:{
		fontSize: 20,
		fontWeight: 'bold'
	}
})

export default BluetoothList
