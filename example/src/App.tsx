/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, View, Image, Button } from 'react-native';
import SuperCamera from 'react-native-super-camera';

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState<string>();

  return (
    <View style={styles.container}>
      <Button title="Abrir Camera" onPress={() => setOpen(true)} />
      <SuperCamera
        visible={open}
        onCancel={() => setOpen(false)}
        onCapture={(fileUrl) => {
          setImage(fileUrl);
          setOpen(false);
        }}
      />

      {image ? (
        <Image
          style={{
            marginTop: 32,
            width: 100,
            height: 100,
          }}
          source={{ uri: image }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
