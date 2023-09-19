import {
  FlatList,
} from 'react-native'
import Device from './device'
import Empty from './empty'
import Subtitle from './subtitle'
import useBle from '../viewModels/useBle'


const DeviceList = props => {
  const { connect } = useBle();

  const renderEmpty = () => <Empty text='No available devices' />
  const renderItem = ({ item }) => {
    return <Device {...item} onPress={() => { connect(item.id) }}
      iconRight={require('../../assets/setting.png')}
      iconLeft={require('../../assets/responsive.png')} />
  }

  return (
    <>
      <Subtitle title={props.title} />
      <FlatList style={{ height: '25%' }}
        data={props.data}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
    </>
  );
}

export default DeviceList;
