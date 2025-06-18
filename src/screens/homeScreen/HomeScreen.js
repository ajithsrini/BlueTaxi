import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {useCallback, useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Bars3Icon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {requestLocationPermission} from '../../utils/MapUtils';
import {LocationContext} from '../../context/LocationContext';
import SavedLocationCard from './components/SavedLocationCard';
import HomeImage from '../../assets/images/svg/homeImage.svg';
import { savedPlaces } from '../../constant/VehicleData';

function HomeScreen({navigation}) {
  const {setPickupCon} = useContext(LocationContext);
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

  const [currentLocation, setCurrentLocation] = useState(null);
  const [gpsStatus, setGpsStatus] = useState(null);
  const handleLocationCheck = async () => {
    const permission = await requestLocationPermission();
    console.log('location permission enabled or not in home:', permission);

    if (permission) {
      const gpsEnabled = await checkGPS();
      console.log('gps enabled or not in home:', gpsEnabled);
      setGpsStatus(gpsEnabled);

      if (!gpsEnabled) {
        Alert.alert('GPS is Off', 'Please enable GPS to use this feature.');
        return;
      }

      if (gpsEnabled) {
        Geolocation.getCurrentPosition(
          async position => {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            console.log('latitude Home:', position.coords.latitude);
            console.log('Longitude Home:', position.coords.longitude);
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
        );
      }
    }
  };

  useEffect(() => {
    handleLocationCheck();
  }, []);

  const navigateToDropLocation = useCallback(() => {
    navigation.navigate('DropLocationSelector');
    setPickupCon(currentLocation);
  }, [navigation, currentLocation]);

  return (
    <SafeAreaView style={style.safeArea}>
      <StatusBar barStyle={'dark-content'} />
      <View style={style.headerMainWrapper}>
        <View style={style.barIconWrapper}>
          <Bars3Icon color={ThemeColors.text1} size={scale(22)} />
        </View>
        <TouchableOpacity
          style={style.searchWrapper}
          onPress={navigateToDropLocation}>
          <MagnifyingGlassIcon size={20} />
          <Text style={style.searchText}>Where are you going?</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: ThemeColors.secondary}}>
        {/* {gpsStatus ? (
          <>
            {currentLocation ? (
              <MapView
                style={{flex: 1}}
                initialRegion={{
                  latitude: currentLocation?.latitude || 11.9386981,
                  longitude: currentLocation?.longitude || 79.8320056,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}>
                <Marker coordinate={currentLocation}>
                  <MapPinIcon color={ThemeColors.primary} />
                </Marker>
              </MapView>
            ) : (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color={ThemeColors.primary} />
              </View>
            )}
          </>
        ) : (
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color: ThemeColors.text1,fontSize:moderateScale(15),fontWeight:"600"}}>
              Please enable GPS to use this feature.
            </Text>
          </View>
        )} */}

        <FlatList 
          data={savedPlaces.slice(0,5)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <SavedLocationCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
        <Image
          source={require('../../assets/images/png/homeImage.png')}
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            resizeMode: 'cover',
            zIndex:10
          }}
        />
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
