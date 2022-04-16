import React, { useCallback, useState, useEffect } from "react";

import { useTheme, useTranslation } from "../hooks/";
import { Block, Button, Text } from "../components/";

import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

const Map = () => {
  const { t } = useTranslation();
  const { gradients, sizes } = useTheme();

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [mapRegion, setmapRegion] = useState({
    latitude: 31.776685,
    longitude: 35.234491,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  const handleMap = useCallback(() => {
    if (location) {
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  return (
    <Block marginTop={10}>
      <MapView
        style={{ alignSelf: "stretch", height: "60%" }}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} />
      </MapView>
      <Button
        onPress={() => {
          handleMap();
        }}
        marginVertical={sizes.l}
        marginHorizontal={sizes.sm}
        gradient={gradients.primary}
      >
        <Text semibold transform="uppercase">
          {t("map.getCurrentLocation")}
        </Text>
      </Button>
    </Block>
  );
};

export default Map;
