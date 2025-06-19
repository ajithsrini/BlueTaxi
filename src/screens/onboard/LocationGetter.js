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
import {handleGpsCheck, requestLocationPermission} from '../../utils/MapUtils';

function LocationGetter({navigation}) {
 

  const handleLocationCheck = async () => {
    const permission = await requestLocationPermission();
    console.log('permission status', permission);
    if (permission) {
          const gpsEnabled = await handleGpsCheck();
          console.log('gps enabled or not in home:', gpsEnabled);
          navigation.navigate("Authentication")
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
       
          <TouchableOpacity
            style={style.btnWrapper}
            onPress={handleLocationCheck}>
            <MapPinIcon color={ThemeColors.secondary} />
            <Text style={style.btnText}>Enable location access</Text>
          </TouchableOpacity>
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
