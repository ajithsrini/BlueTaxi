import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

export const GOOGLE_MAPS_APIKEY = 'AIzaSyBfCNV7p-fR26gNWYsUKfwhzOeQx4eeCb0';

export const requestLocationPermission = async () => {
  const permissionGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if(permissionGranted){
    return true
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


