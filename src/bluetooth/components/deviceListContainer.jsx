import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native'

import DeviceList from './deviceList';

const DeviceContainer = (props) => {
  return (
    <>
      <View style={props.isEnabled ? styles.devices_enabled : styles.devices_disabled}>
        <DeviceList style={{ height: '50%' }}
          title='Devices Paired'
          data={props.listDevices}
        />
        <DeviceList style={{ height: '50%' }}
          title='Devices Found'
          data={props.unpairedDevices}
        />
      </View>
      <View style={props.isEnabled ? styles.container_disabled : styles.container_enabled}>
        <Text style={styles.text}>
          Bluetooth is disabled
        </Text>
        <Image source={props.image} style={styles.image} />
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container_disabled: {
    display: 'none',
  },
  container_enabled: {
    alignItems: 'center',
    height: '70%',
    justifyContent: 'center',
    display: 'flex'
  },
  devices_disabled: {
    display: 'none'
  },
  devices_enabled: {
    display: 'flex',
    height: '70%'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray'
  },
  image: {
    marginTop: 40,
    height: 90,
    width: 90
  }
})

export default DeviceContainer;
