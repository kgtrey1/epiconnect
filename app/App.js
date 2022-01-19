import { StyleSheet, Text, View, Image } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { AppRegistry, TouchableOpacity } from 'react-native';
import React from 'react';
import AiBoard from './AiBoard';
import { Modal, Portal, TextTest, Button, Provider } from 'react-native-paper';


function App() {
  const [visible, setVisible] = React.useState(false)
  const [endText, setEndText] = React.useState('')
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {backgroundColor: 'white', padding: 20}
 
  const handleWin = (player) => {
    console.log(player)
    if (player === '1')
      setEndText('You win!')
    else
      setEndText('You lost!')
    showModal()
  }

  return (
    
      <Provider>
        <Portal>
          <Modal visible={visible} dismissable={true} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>{endText}</Text>
          </Modal>
        </Portal>
        <View style={styles.container}>
          <AiBoard onWin={handleWin}/>
        </View>
      </Provider>
  )
}

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1
  },
  emptyPawn: {
    backgroundColor: 'white',
    flex: 1,
    width: '50%',
    height: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100
  },
  yellowPawn: {
    backgroundColor: 'yellow',
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100
  },
  redPawn: {
    backgroundColor: 'red',
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100
  }
});
