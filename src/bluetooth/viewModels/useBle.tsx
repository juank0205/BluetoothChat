import { PERMISSIONS } from "react-native-permissions";
import { PermissionsAndroid, Platform } from "react-native";

type PermissionCallback = (result: boolean) => void;

interface BluetoothLEApi {
	requestPermissions(callback: PermissionCallback): Promise<void>;
}

export default function useBle(): BluetoothLEApi {
	const requestPermissions = async (callback: PermissionCallback) => {
		if (Platform.OS === 'android') {
			const grantedStatus = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: "Locatiob Permision",
					message: "Porfis",
					buttonNegative: "Dele al otro",
					buttonPositive: "A este si",
					buttonNeutral: "Este tampoco"
				}
			);
			callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
		} else {
			callback(true);
		}
	};

	return {
		requestPermissions, 
	}
}
