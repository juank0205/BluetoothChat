import { PermissionsAndroid, Platform } from "react-native";
import { useState } from "react";
import { BleManager, Device } from "react-native-ble-plx";

import DeviceInfo from 'react-native-device-info';
import BluetoothSerial from "react-native-bluetooth-serial";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { setEnabled } from "react-native/Libraries/Performance/Systrace";


const bleManager = new BleManager();

export default function useBle() {
  const [allDevices, setAllDevices] = useState([]);
  const [unpairedDevices, setUnpairedDevices] = useState([]);
  const [connected, setConnected] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  let discovering = false;

  const requestPermissions = async (callback) => {
    if (Platform.OS === 'android') {
      const ApiLevel = await DeviceInfo.getApiLevel();
      if (ApiLevel < 31) {
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
      }
      else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        ]);

        const isAllPermissionsGranted =
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;
        callback(isAllPermissionsGranted);
      }
    } else {
      callback(true);
    }
  };

  const isDuplicateDevice = (devices, nextDevice) => {
    if (devices.length == 0) return false;
    else {
      const repeated = devices.findIndex(device => (nextDevice.id === device.id)) > -1;
      return (repeated && (nextDevice.rssi == null ? false : (nextDevice.rssi < 50)));
    }
  }

  const scanForDevices = () => {
    bleManager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
      if (error) {
        console.log(error);
      }
      setAllDevices(prevState => {
        if (!isDuplicateDevice(prevState, device)) {
          return [...prevState, device];
        }
        return prevState;
      })
    })
  }

  const enable = async () => {
    await BluetoothSerial.enable();
    setIsEnabled(true);
  }

  const disable = async () => {
    await BluetoothSerial.disable();
    setIsEnabled(false);
  }

  const listDevices = async () => {
    let devices = await BluetoothSerial.list();
    setUnpairedDevices((prevState) => [...prevState, ...devices])
  }

  const discoverUnpaired = () => {
    console.log(discovering);
    if (discovering) return false;
    else {
      discovering = true;
      BluetoothSerial.discoverUnpairedDevices()
        .then(devices => {
          setUnpairedDevices(prevState => [...prevState, ...devices].reduce((accumulator, currentItem) => {
            const exists = accumulator.some(item => item.id === currentItem.id);
            if (!exists) accumulator.push(currentItem);

            return accumulator;
          }, []));
          discovering = false;
          console.log(unpairedDevices);
        }).catch(err => {
          console.log(err);
        })
    }
  }

  return {
    requestPermissions,
    // scanForDevices,
    allDevices,
    unpairedDevices,
    isEnabled,
    enable,
    disable,
    listDevices,
    discoverUnpaired
  }
}
