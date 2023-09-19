import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native'
import InputText from '../components/InputText';

const Chat = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior='padding'
        enabled>
        <ScrollView contentContainerStyle={styles.scrollMessages}>
          <View style={styles.messages} >
            <Text>a</Text>
          </View>
          <InputText />
        </ScrollView>
      </KeyboardAvoidingView>
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
    // height: '100%'
  }
})
/*
   <ChatHistory />
   <InputText />
   */
export default Chat;
