import React, { useCallback, useRef, useState } from 'react';

import { RNCamera } from 'react-native-camera';
import { Modal, View, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import CameraPhotos from './CameraPhotos';
import CameraControl from './CameraControl';
import CameraHeaderControl from './CameraHeaderControl';

export interface SuperCameraProps {
  visible: boolean;
  onCancel: () => void;
  onCapture: (resultUrl: string) => void;
}

function SuperCamera({ visible, onCancel, onCapture }: SuperCameraProps) {
  const refCamera = useRef<RNCamera | null>();

  const [cameraConfig, setCameraConfig] = useState({
    flash: false,
    cameraBack: true,
  });

  const onChange = (prop: string, value: any) => {
    setCameraConfig((prev) => ({ ...prev, [prop]: value }));
  };

  const handleTakePhoto = useCallback(async () => {
    const res = await refCamera.current?.takePictureAsync();

    if (res?.uri !== null) {
      onCapture(res?.uri as string);
    }
  }, [refCamera, onCapture]);

  return (
    <>
      <Modal animationType="fade" visible={visible} onRequestClose={onCancel}>
        <RNCamera
          style={styles.camera}
          ref={(ref) => (refCamera.current = ref)}
          captureAudio={false}
          type={
            cameraConfig.cameraBack
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          flashMode={
            cameraConfig.flash
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          useNativeZoom
        >
          <CameraHeaderControl
            cameraConfig={cameraConfig}
            onClose={() => onCancel()}
            onFlashToogle={() => onChange('flash', !cameraConfig.flash)}
          />

          <View style={styles.header}>
            <View style={styles.wrapper_photos}>
              <CameraPhotos onSelect={(fileUri) => onCapture(fileUri)} />
            </View>
            <View style={styles.wrapper_camera_control}>
              <CameraControl
                onGalleryOpen={() => {
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                    },
                    (result) => console.log(result)
                  );
                }}
                onTakePhoto={handleTakePhoto}
                onChangeCamera={() =>
                  onChange('cameraBack', !cameraConfig.cameraBack)
                }
              />
            </View>
          </View>
        </RNCamera>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    bottom: 16,
  },
  wrapper_photos: {
    marginBottom: 16,
  },
  wrapper_camera_control: {
    paddingHorizontal: 16,
  },
  camera: {
    flex: 1,
  },
});

export default SuperCamera;
