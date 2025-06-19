import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {isLocationEnabled} from 'react-native-android-location-enabler';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import {resolver} from '../../metro.config';

export const GOOGLE_MAPS_APIKEY = 'AIzaSyBfCNV7p-fR26gNWYsUKfwhzOeQx4eeCb0';

export const requestLocationPermission = async () => {
  const permissionGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (permissionGranted) {
    return true;
  }

  if (!permissionGranted) {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Blocked',
          'Location permission was permanently denied. Please enable it from settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
        return false;
      } else {
        return false;
      }
    }
  }
};

export async function handleGpsCheck() {
  if (Platform.OS === 'android') {
    const checkEnabled = await isLocationEnabled();
    console.log('checkEnabled', checkEnabled);
    if (checkEnabled) {
      return true;
    }
    if (!checkEnabled) {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup

        return true;
      } catch (error) {
        if (error instanceof Error) {
          // console.error(error.message);
          // The user has not accepted to enable the location services or something went wrong during the process
          // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
          // codes :
          //  - ERR00 : The user has clicked on Cancel button in the popup
          //  - ERR01 : If the Settings change are unavailable
          //  - ERR02 : If the popup has failed to open
          //  - ERR03 : Internal error
          return false;
        }
      }
    }
  }
}

const fetchCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    console.log('fetching initiated');
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      },
    );
  });
};
export const getUserCurrentLocation = async () => {
  try {
    const position = await fetchCurrentLocation();
    return position.coords;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null
  }
};

export const getAddressFromCoords = async (latitude, longitude) => {
  if (!latitude || !longitude) return null;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`,
    );

    if (response.data.status === 'OK') {
      const format = response.data.results[0].formatted_address;

      console.log('Address:', response.data.results[0]);
      return format;
    } else {
      console.warn('Reverse geocoding failed:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};
export const parseAddress = fullAddress => {
  if (!fullAddress) return {street: '', area: ''};

  const parts = fullAddress.split(',').toSpliced(0, 1).toSpliced(2);
  return {
    street: parts.join(',').trim() || '',
    area: fullAddress,
  };
};
