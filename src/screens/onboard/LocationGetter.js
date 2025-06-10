import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBg from '../../assets/images/svg/locationGetterBg.svg';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import {useState} from 'react';
import {MapPinIcon} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LocationGetter({navigation}) {


  const [locationFetch, setLocationFetch] = useState(false);

  const requestLocationPermission = async () => {

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      // return granted === PermissionsAndroid.RESULTS.GRANTED;
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
      }
    }
    return true;
  };

  const checkGPS = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(true),
        error => {
          if (error.code === 2) resolve(false);
          else reject(error);
        },
        {enableHighAccuracy: true, timeout: 10000},
      );
    });
  };

  const handleLocationCheck = async () => {

    const permissionGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!permissionGranted) {
      const requested = await requestLocationPermission();
      console.log('permission status', requested);
      // if (!requested) {
      //   navigation.replace("Authentication")
      //   return;
      // }
    }

    const gpsEnabled = await checkGPS();
    // if (!gpsEnabled) {
    //   Alert.alert('GPS is Off', 'Please enable GPS to use this feature.', [
    //     {text: 'Open Settings', onPress: () => Linking.openSettings()},
    //     {text: 'Cancel', style: 'cancel'},
    //   ]);
    //   return;
    // }

    if (gpsEnabled) {

      setLocationFetch(true)
      Geolocation.getCurrentPosition(
        position => {
          AsyncStorage.setItem('latitude', position.coords.latitude.toString());
          AsyncStorage.setItem('longitude', position.coords.longitude.toString());
          console.log('latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
          setLocationFetch(false)
          navigation.navigate("Authentication")
        },
        
        error => {
          console.error('Error getting location:', error);
          setLocationFetch(false)
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }

    
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.imageWrapper}>
        <TopBg width="100%" height="50%" />
      </View>
      <View style={style.detailWrapper}>
        <Text style={style.primaryText}>Hi, nice to meet you!</Text>
        <Text style={style.secondaryText}>{`Choose your location to start find
restaurants around you.`}</Text>
       {!locationFetch ? 
        <TouchableOpacity
          style={style.btnWrapper}
          onPress={handleLocationCheck}>
          <MapPinIcon color={ThemeColors.secondary} />
          <Text style={style.btnText}>Use current location</Text>
        </TouchableOpacity>
        :
         <TouchableOpacity
          style={style.btnWrapper}
          onPress={handleLocationCheck}>
          <ActivityIndicator color={ThemeColors.secondary} size={'small'} />
        </TouchableOpacity>
        }
        {/* <TouchableOpacity style={style.btnWrapper2}>
          <Text style={style.btnText2}>Enter pickup manually</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

export default LocationGetter;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeColors.secondary,
  },
  imageWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  detailWrapper: {
    flex: 0.5,
    paddingTop: verticalScale(35),
  },
  primaryText: {
    color: ThemeColors.text1,
    fontWeight: '700',
    fontSize: moderateScale(30),
    alignSelf: 'center',
  },
  secondaryText: {
    color: ThemeColors.text2,
    fontWeight: '400',
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
  btnWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    // borderWidth: scale(1.5),
    // borderColor: ThemeColors.primary,
    borderRadius: scale(8),
    paddingVertical: verticalScale(8),
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(35),
    backgroundColor: ThemeColors.primary,
  },
  btnWrapper2: {
    borderWidth: scale(1.5),
    borderColor: ThemeColors.primary,
    borderRadius: scale(8),
    paddingVertical: verticalScale(8),
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(15),
    backgroundColor: ThemeColors.secondary,
  },
  btnText: {
    color: ThemeColors.secondary,
    fontSize: moderateScale(15),
    fontWeight: '500',
    marginLeft: scale(15),
  },
  btnText2: {
    color: ThemeColors.primary,
    fontSize: moderateScale(15),
    fontWeight: '500',
  },
});
