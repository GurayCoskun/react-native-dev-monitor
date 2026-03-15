import 'react-native-dev-monitor';

import { DevMonitorOverlay } from 'react-native-dev-monitor';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

function App() {
  const [mode, setIsMode] = useState<'mini' | 'fullscreen'>('mini');

  const triggerFetch = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Developer': 'Guray',
      },
    });
  };

  const triggerXHR = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(
      JSON.stringify({
        title: 'DevMonitor Test',
        body: 'Bu bir XHR isteğidir.',
        userId: 1,
      })
    );
  };

  return mode === 'mini' ? (
    <View style={styles.container}>
      <Button title="Call Fetch Api" onPress={triggerFetch} />
      <View style={styles.wrapper}>
        <Button title="Call XHR" onPress={triggerXHR} />
      </View>
      <View style={styles.wrapper}>
        <Button
          title="Change Mode to FullScreen"
          onPress={() => setIsMode('fullscreen')}
        />
      </View>

      <DevMonitorOverlay mode={'mini'} />
    </View>
  ) : (
    <View style={styles.containerFullScreen}>
      <View style={styles.row}>
        <Button title="Call Fetch" onPress={triggerFetch} />
        <Button title="Call XHR" onPress={triggerXHR} />
        <Button title="Change Mode to Mini" onPress={() => setIsMode('mini')} />
      </View>
      <DevMonitorOverlay mode={'fullscreen'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFullScreen: {
    flex: 1,
    paddingTop: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    marginTop: 8,
  },
});

export default App;
