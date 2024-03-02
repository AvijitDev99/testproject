import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geolocations from '@react-native-community/geolocation';

// Get Current Location
export function getCurrentLocation(callback = () => {}) {
  if (Platform.OS == 'ios') {
    getCurrentPosition(res => callback(res));
  } else {
    requestPermission(res => {
      if (res) {
        setTimeout(() => {
          getCurrentPosition(res => callback(res));
        }, 5000);
      }
    });
  }
}

// Get Watch Current Location
export function getWatchLocation(callback = () => {}) {
  if (Platform.OS == 'ios') {
    getWatchPosition(res => callback(res));
  } else {
    requestPermission(res => {
      if (res) {
        setTimeout(() => {
          getWatchPosition(res => callback(res));
        }, 5000);
      }
    });
  }
}

// Check Permission
async function requestPermission(callback = () => {}) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Maidmo Location Permission',
        message: 'Maidmo needs to access your location',
        //   buttonNeutral: "Ask Me Later",
        //   buttonNegative: "Cancel",
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      callback(true);
    } else {
      callback(false);
      console.log('location permission denied');
    }
  } catch (err) {
    callback(false);
    // console.warn(err);
  }
}

// Get Location
function getCurrentPosition(callback = () => {}) {
  if (Platform.OS == 'ios') {
    Geolocations.getCurrentPosition(
      position => {
        let obj = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        callback(obj);
      },
      error => {
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 3600000,
      },
    );
  } else {
    Geolocation.getCurrentPosition(
      position => {
        let currentRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        callback(currentRegion);
      },
      error => {
        console.log('error : ', error);
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 3600000,
      },
    );
  }
}

// Watch Location
function getWatchPosition(callback = () => {}) {
  if (Platform.OS == 'ios') {
    Geolocations.watchPosition(
      position => {
        let obj = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        callback(obj);
      },
      error => {
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 3600000,
      },
    );
  } else {
    Geolocation.watchPosition(
      position => {
        let currentRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        callback(currentRegion);
      },
      error => {
        console.log('error : ', error);
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 3600000,
      },
    );
  }
}
