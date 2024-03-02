import {View, Text, Platform, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {getCurrentLocation, getWatchLocation} from './src/helper';
// import {enableLatestRenderer} from 'react-native-maps';
// enableLatestRenderer();

const App = () => {
  const mapMainRef = useRef();
  const MAP_PLATFROM_TYPE = Platform.OS === 'android' ? 'terrain' : 'standard';

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    // latitudeDelta: 0.001,
    // longitudeDelta: 0.001,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerLocation, setMarkerLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // getCurrentLocation(res => {
    //   setCurrentLocation(pre => ({
    //     ...pre,
    //     latitude: res.latitude,
    //     longitude: res.longitude,
    //   }));

    //   setMarkerLocation(pre => ({
    //     ...pre,
    //     latitude: res.latitude,
    //     longitude: res.longitude,
    //   }));
    // });

    getWatchLocation(res => {

      console.log('res -- ',res);
      setCurrentLocation(pre => ({
        ...pre,
        latitude: res.latitude,
        longitude: res.longitude,
      }));

      setMarkerLocation(pre => ({
        ...pre,
        latitude: res.latitude,
        longitude: res.longitude,
      }));
    });
  }, []);

  function animateMap(latitude, longitude) {
    console.log('latitude, longitude -- ', latitude, longitude);
    // mapMainRef.current.animateCamera({
    //   center: {
    //     latitude: latitude,
    //     longitude: longitude,
    //   },
    //   pitch: 0,
    //   heading: 0,
    //   altitude: 1000,
    //   zoom: 18,
    // });
    setMarkerLocation(pre => ({
      ...pre,
      latitude: latitude,
      longitude: longitude,
    }));
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapMainRef}
        provider={PROVIDER_GOOGLE}
        style={{
          flex: 1,
        }}
        region={currentLocation}
        initialRegion={currentLocation}
        // onRegionChange={position => {
        //   console.log('-- ',position);
        // }}
        onPress={event => {
          animateMap(
            event.nativeEvent.coordinate.latitude,
            event.nativeEvent.coordinate.longitude,
          );
        }}
        zoomEnabled={true}
        mapType="satellite"
        toolbarEnabled={true}
        showsCompass={true}
        showsScale={true}
        loadingEnabled={true}
        showsBuildings={true}
        showsMyLocationButton={false}
        showsTraffic={false}
        moveOnMarkerPress={false}
        userLocationPriority={'high'}
        followsUserLocation={false}
        showsPointsOfInterest={false}
        rotateEnabled={true}
        showsUserLocation={false}
        paddingAdjustmentBehavior={'always'}
        precision="high">
        <Marker coordinate={markerLocation}></Marker>
      </MapView>
    </View>
  );
};

export default App;
