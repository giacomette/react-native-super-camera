/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  FlatList,
  PanResponder,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import CameraRoll, {
  PhotoIdentifiersPage,
} from '@react-native-community/cameraroll';

import { launchImageLibrary } from 'react-native-image-picker';

interface CameraPhotosProps {
  onSelect: (fileUri: string) => void;
}

let openedGallery = false;

function CameraPhotos({ onSelect }: CameraPhotosProps) {
  const [infoPhotos, setInfoPhotos] = useState<PhotoIdentifiersPage>();

  const beginY = useRef(new Animated.Value(0)).current;

  const window = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await CameraRoll.getPhotos({
        first: 10 * currentPage,
        assetType: 'Photos',
      });

      setInfoPhotos(result);
      setIsLoading(false);
    })();
  }, [currentPage]);

  const handleOpenGalerry = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (result) => {
        openedGallery = false;
        if (!result.didCancel && result.uri) {
          onSelect(result.uri);
        }
      }
    );
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      if (openedGallery) {
        return false;
      }

      if (gestureState.moveY <= window.height / 1.5) {
        openedGallery = true;
        setTimeout(() => {
          beginY.setValue(0);
          handleOpenGalerry();
        }, 300);
        return false;
      }

      beginY.setValue(gestureState.dy);

      return true;
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [
          {
            translateY: beginY,
          },
        ],
      }}
    >
      <View
        style={{
          marginBottom: 32,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 60,
            height: 5,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
        />
      </View>
      <FlatList
        data={infoPhotos?.edges ?? []}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={() => {
          if (!isLoading) {
            setCurrentPage((prev) => prev + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item, index }) => {
          const isLast = index === (infoPhotos?.edges ?? [])?.length - 1;

          return (
            <View key={index}>
              <View
                style={{
                  marginLeft: 12,
                  marginRight: isLast ? 12 : 0,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => onSelect(item.node.image.uri)}
                >
                  <Image
                    style={{
                      borderRadius: 8,
                      width: 90,
                      height: 70,
                    }}
                    source={{ uri: item.node.image.uri }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </Animated.View>
  );
}

export default CameraPhotos;
