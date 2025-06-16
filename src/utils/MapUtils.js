import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

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

import axios from 'axios';

export const getAddressFromCoords = async (latitude, longitude) => {
  if(!latitude || !longitude) return null
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`,
    );

    if (response.data.status === 'OK') {

      const format = response.data.results[0].formatted_address;
      
      console.log('Address:', format);
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
