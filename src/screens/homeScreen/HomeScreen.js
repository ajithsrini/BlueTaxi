import {
  ActivityIndicator,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {useCallback, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bars3Icon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {scale, verticalScale} from 'react-native-size-matters';
import MapView, {Marker} from 'react-native-maps';


function HomeScreen({navigation}) {


  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
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
        {
          enableHighAccuracy: true,
          timeout: 10000,
          forceRequestLocation: true,
          forceLocationManager: true,
          showLocationDialog: true,
        },
      );
    });
  };

  const [currentLocation, setCurrentLocation] = useState(null)
  const handleLocationCheck = async () => {
    console.log('function running');
    const permissionGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!permissionGranted) {
      const requested = await requestLocationPermission();
      if (!requested) {
        Alert.alert('Permission Denied', 'Location access is required for this app.');
        return;
      }
    }

    const gpsEnabled = await checkGPS();
    if (!gpsEnabled) {
      Alert.alert('GPS is Off', 'Please enable GPS to use this feature.');
      return;
    }

    if(gpsEnabled){
    Geolocation.getCurrentPosition(
      async position => {
          try {
            setCurrentLocation({
                "latitude": position.coords.latitude,
                "longitude":  position.coords.longitude
            })
            await AsyncStorage.setItem(
              'latitude',
              position.coords.latitude.toString(),
            );
            await AsyncStorage.setItem(
              'longitude',
              position.coords.longitude.toString(),
            );
            console.log('latitude Home:', position.coords.latitude);
            console.log('Longitude Home:', position.coords.longitude);
          } catch (e) {
            console.error('AsyncStorage error:', e);
          }
        },

      error => {
        Alert.alert('Error getting location', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      },
    );}
  };


useEffect(() => {
  const fetchLocationData = async () => {
    await handleLocationCheck();
    // await getPickUp();
  };

  fetchLocationData();
}, []);


  // const getPickUp = async () => {
  //   const response = await AsyncStorage.multiGet(['latitude', 'longitude']);
  //   console.log(
  //     'pickup location',
  //     'latitude',
  //     response[0][1],
  //     'longitude',
  //     response[1][1],
  //   );
  // };

  const navigateToDropLocation = useCallback(()=>{
    navigation.navigate("DropLocationSelector")
  },[navigation])

  
  return (
    <SafeAreaView style={style.safeArea}>
    <StatusBar barStyle={"dark-content"} />
      <View style={style.headerMainWrapper}>
        <View style={style.barIconWrapper}>
          <Bars3Icon color={ThemeColors.text1} size={scale(22)} />
        </View>
        <TouchableOpacity style={style.searchWrapper} onPress={navigateToDropLocation}>
          <MagnifyingGlassIcon size={20} />
          <Text style={style.searchText}>Where are you going?</Text>
        </TouchableOpacity>
      </View>
       <View style={{ flex: 1}}>
       {currentLocation ?
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          
          <Marker coordinate={currentLocation}>

            <MapPinIcon color={ThemeColors.primary}/>
            
            </Marker>
          
        </MapView>:
        <View style={{flex:1,justifyContent:"center"}}>
        <ActivityIndicator
          size="large"
          color={ThemeColors.primary}
          
        />
        </View>
        }

      
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const style = StyleSheet.create({
  safeArea: {
    backgroundColor: ThemeColors.secondary,
    flex: 1,
  },
  headerMainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(7),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E4E2',
  },
  searchWrapper: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.lightGray,
    alignItems: 'center',
    borderRadius: scale(50),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(7),
    flex: 90,
  },
  searchText: {
    fontSize: scale(14),
    fontWeight: '500',
    color: ThemeColors.text1,
    marginLeft: scale(10),
  },
  barIconWrapper: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


