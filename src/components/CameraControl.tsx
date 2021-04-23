/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CameraControlProps {
  onGalleryOpen: () => void;
  onTakePhoto: () => void;
  onChangeCamera: () => void;
}

function CameraControl({
  onGalleryOpen,
  onTakePhoto,
  onChangeCamera,
}: CameraControlProps) {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity activeOpacity={0.8} onPress={onGalleryOpen}>
            <IconFontAwesome
              name="photo"
              color="white"
              style={{ fontSize: 32 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <TouchableOpacity activeOpacity={0.8} onPress={onTakePhoto}>
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              color="white"
              style={{
                fontSize: 80,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <TouchableOpacity activeOpacity={0.8} onPress={onChangeCamera}>
            <MaterialCommunityIcons
              name="camera-outline"
              color="white"
              style={{
                fontSize: 32,
              }}
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
  },
  column: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default CameraControl;
