import { PermissionsAndroid, Platform } from "react-native";
import { useState } from "react";

import DeviceInfo from 'react-native-device-info';
import BluetoothSerial from "react-native-bluetooth-serial";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";

export default function useBle() {
  const [allDevices, setAllDevices] = useState([]);
  const [unpairedDevices, setUnpairedDevices] = useState([]);
  const [connected, setConnected] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  BluetoothSerial.on('connectionSuccess', () => {
    console.log("conectado, waos")
  });

  BluetoothSerial.on('connectionLost', () => {
    console.log("chao")
  });

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

  const enable = async () => {
    await BluetoothSerial.enable();
    setIsEnabled(true);
  }

  const disable = async () => {
    await BluetoothSerial.disable();
    setIsEnabled(false);
  };

  const listDevices = async () => {
    let devices = await BluetoothSerial.list();
    setAllDevices((prevState) => [...prevState, ...devices])
  };

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
          console.log(unpairedDevices);
        }).catch(err => {
          console.log(err);
        });
    };
  }
  const isConnected = async () => {
    console.log(await BluetoothSerial.isConnected());
    return await BluetoothSerial.isConnected();
  };

  const connect = async id => {
    if (connected) return false;
    else {
      await BluetoothSerial.connect(id)
        .then(res => {
          setConnected(true);
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  }

  const disconnect = async () => {
    if (!connected) return false;
    else {
      await BluetoothSerial.disconnect()
        .then(res => {
          setConnected(false);
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  }

  const write = (data) => {
    BluetoothSerial.write(data)
    .then((res) => {
      console.log("Escrito: " + data);
    })
    .catch( err => console.log(err));
  }

  return {
    requestPermissions,
    setAllDevices,
    setUnpairedDevices,
    allDevices,
    unpairedDevices,
    isEnabled,
    enable,
    disable,
    listDevices,
    discoverUnpaired,
    isConnected,
    connect,
    disconnect,
    write
  }
}
