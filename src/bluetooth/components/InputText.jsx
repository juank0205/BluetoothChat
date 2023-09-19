import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

const InputText = () => {
  const [message, setMessage] = useState('');

  const send = () => {
    console.log("A");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setMessage}
        value={message}
        style={styles.textInput}
        placeholder="Enter your message"
      />
      <View style={styles.button}>
        <Button title='Send' onPress={send} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: '70%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: '20%'
  }
})

export default InputText;
