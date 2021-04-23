/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CameraHeaderControlProps {
  onClose: () => void;
  onFlashToogle: () => void;
  cameraConfig: any;
}

function CameraHeaderControl({
  onClose,
  onFlashToogle,
  cameraConfig,
}: CameraHeaderControlProps) {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.wrapper}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => onClose()}>
            <IconFontAwesome
              name="remove"
              color="white"
              style={{ fontSize: 24 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => onFlashToogle()}>
            <MaterialCommunityIcons
              name={!cameraConfig.flash ? 'flash-outline' : 'flash'}
              color="white"
              style={{ fontSize: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 16,
  },
  wrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
});

export default CameraHeaderControl;
