import {
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
import {Bars3Icon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {
  getUserCurrentLocation,
  handleGpsCheck,
  requestLocationPermission,
} from '../../utils/MapUtils';
import {LocationContext} from '../../context/LocationContext';
import SavedLocationCard from './components/SavedLocationCard';
import {savedPlaces} from '../../constant/VehicleData';

function HomeScreen({navigation}) {
  const {setPickupCon} = useContext(LocationContext);

  const [currentLocation, setCurrentLocation] = useState(null);

  const handleLocationCheck = async () => {
    const permission = await requestLocationPermission();
    console.log('location permission enabled or not in home:', permission);

    if (permission) {
      const gpsEnabled = await handleGpsCheck();
      console.log('gps enabled or not in home:', gpsEnabled);

      if (gpsEnabled) {
        const position = await getUserCurrentLocation();
        setCurrentLocation({
          latitude: position.latitude,
          longitude: position.longitude,
        });
        console.log(
          'user current location',
          position.latitude,
          position.longitude,
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
        <TouchableOpacity style={style.barIconWrapper} onPress={()=>navigation.toggleDrawer()}>
          <Bars3Icon color={ThemeColors.text1} size={scale(22)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.searchWrapper}
          onPress={navigateToDropLocation}>
          <MagnifyingGlassIcon size={20} />
          <Text style={style.searchText}>Where are you going?</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: ThemeColors.secondary}}>
        <FlatList
          data={savedPlaces.slice(0, 5)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <SavedLocationCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: verticalScale(5)}}
        />
        <Image
          source={require('../../assets/images/png/homeImage.png')}
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            resizeMode: 'cover',
            zIndex: 10,
            opacity: 0.3,
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
    backgroundColor: ThemeColors.lightBlue,
    alignItems: 'center',
    borderRadius: scale(50),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(7),
    flex: 85,
  },
  searchText: {
    fontSize: scale(14),
    fontWeight: '500',
    color: ThemeColors.text1,
    marginLeft: scale(10),
  },
  barIconWrapper: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
