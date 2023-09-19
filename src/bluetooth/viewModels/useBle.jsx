import { PermissionsAndroid, Platform, ToastAndroid } from "react-native";
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
    console.log("Conected");
  });

  BluetoothSerial.on('connectionLost', () => {
    console.log("Connection lost");
  });

  BluetoothSerial.on('bluetoothEnabled', () => {
    console.log("Bluetooth enabled");
    console.log("Enabled: " + isEnabled);
  });

  BluetoothSerial.on('bluetoothDisabled', () => {
    console.log("Bluetooth disabled")
    console.log("Enabled: " + isEnabled);
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

  const syncToggle = async () => {
    console.log("syncing" + await BluetoothSerial.isEnabled());
    if (await BluetoothSerial.isEnabled()) setIsEnabled(true);
    else setIsEnabled(false);
    console.log("enabled: " + isEnabled);
  }

  const toggle = async () => {
    if (isEnabled) {
      await BluetoothSerial.disable().then(() => {
        setIsEnabled(false);
      });
    } else {
      await BluetoothSerial.enable().then(() => {
        setIsEnabled(true);
        listDevices();
        discoverUnpaired();
      });
    }
  }

  const listDevices = async () => {
    let devices = await BluetoothSerial.list();
    setAllDevices((prevState) => [...prevState, ...devices].reduce((accumulator, currentItem) => {
      const exists = accumulator.some(item => item.id === currentItem.id);
      if (!exists) accumulator.push(currentItem);
      return accumulator;
    }, []));
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
          console.log("descubiertos:" + unpairedDevices);
        }).catch(err => {
          console.log(err);
        });
    };
  }

  const syncIsConnected = async () => {
    let flag = await BluetoothSerial.isConnected();
    setConnected(flag);
  }

  const isConnected = async () => {
    return await BluetoothSerial.isConnected();
  };

  const connect = async id => {
    if (await isConnected()) return false;
    else {
      await BluetoothSerial.connect(id)
        .then(res => {
          console.log("is connected: " + connected)
          setConnected(true)
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        })
        .catch(err => console.log(err));
    }
  }

  const disconnect = async () => {
    if (!(await isConnected())) return false;
    else {
      await BluetoothSerial.disconnect()
        .then(res => {
          setConnected(false)
          ToastAndroid.show("Disconnected", ToastAndroid.SHORT);
        })
        .catch(err => console.log(err));
    }
  }

  const write = (data) => {
    BluetoothSerial.write(data)
      .then((res) => {
        console.log("Escrito: " + data);
      })
      .catch(err => console.log(err));
  }

  return {
    requestPermissions,
    setAllDevices,
    setUnpairedDevices,
    allDevices,
    unpairedDevices,
    isEnabled,
    toggle,
    syncToggle,
    listDevices,
    discoverUnpaired,
    isConnected,
    connect,
    disconnect,
    write,
    isEnabled,
    connected,
    syncIsConnected
  }
}
