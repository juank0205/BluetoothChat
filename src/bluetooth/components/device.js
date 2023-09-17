import React, { memo } from 'react'
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Image,
} from 'react-native';

function Device(props) {
	return (
		<TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
			<View style={styles.wrapperLeft}>
				<Image style={styles.iconLeft} source={props.iconLeft}/>
			</View>
			<View style={styles.wrapperName}>
				<Text style={styles.name}>{props.name}</Text>
			</View>
			<Image style={styles.iconRight} source={props.iconRight}/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: "row",
		alignItems: 'center',
		padding: 10,
		justifyContent: 'space-between'
	},
	wrapperLeft: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'gray',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconLeft: {
		width: 20,
		height: 20,
	},
	wrapperName: {
		flex: 1,
		justifyContent: 'flex-start',
		marginLeft: 15
	},
	name: {

	},
	iconRight: {
		height: 40,
		width: 40
	}
})

export default Device;
