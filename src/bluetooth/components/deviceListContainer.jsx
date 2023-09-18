
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import useBle from '../viewModels/useBle'
import DeviceList from './deviceList';

const DeviceContainer = (props) => {
  const { isEnabled, allDevices, unpairedDevices } = useBle();
  return (
    <>
      <View>
        <DeviceList style={{ height: '30%' }}
          title='Devices Paired'
          data={allDevices}
        />
        <DeviceList style={{ height: '30%' }}
          title='Devices Found'
          data={unpairedDevices}
        />
      </View>
      <View style={isEnabled? styles.container_enabled:styles.container_disabled}>
        <Text>
          Bluetooth is disabled
        </Text>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container_disabled: {
    flex: 1,
    alignItems: 'center',
    display: 'none'
  },
  container_enabled: {
    flex: 1,
    alignItems: 'center',
    display: 'flex'
  }

})

export default DeviceContainer;
