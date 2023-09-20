import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View
} from 'react-native';
import useBle from '../viewModels/useBle';

const InputText = () => {
  const [message, setMessage] = useState('');
  const { write } = useBle();

  const send = () => {
    ToastAndroid.show('Written: ' + message, ToastAndroid.SHORT);
    write(message);
  }


  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => setMessage(text)}
        value={message}
        style={styles.textInput}
      />
      <View style={styles.button}>
        <Button title='Send' onPress={send} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    flexDirection: 'row',
    height: 40,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: '100%',
    height: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    end: 10,
    width: '20%'
  }
})

export default InputText;
