import {
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import InputText from '../components/InputText';

const Chat = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <InputText />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  scrollMessages: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  messages: {
    flex: 1,
  }
})

export default Chat;
