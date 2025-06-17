import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import CurrentLocation from '../../assets/images/svg/currentLocation.svg';
import {useCallback, useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {getAddressFromCoords, parseAddress} from '../../utils/MapUtils';
import PickUpIcon from '../../assets/images/svg/pickUpIcon.svg';

function SelectOnMap({navigation}) {
  const goBack = useCallback(() => {
    navigation.goBack();
  });

  const currentLocation = {
    latitude: 11.9386981,
    longitude: 79.8320056,
  };

  const [region, setRegion] = useState({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [locationDetails, setLocationDetails] = useState();

  const regionRef = useRef(region);

  useEffect(() => {
    regionRef.current = region;
  }, [region]);

const onRegionChangeComplete = async (trackRegion) => {
  if (
    Math.abs(trackRegion.latitude - regionRef.current.latitude) > 0.0001 ||
    Math.abs(trackRegion.longitude - regionRef.current.longitude) > 0.0001
  ) {
    // Only update if significant change
    const response = await getAddressFromCoords(
      trackRegion.latitude,
      trackRegion.longitude
    );
    const modifiedAddress = parseAddress(response)
    console.log("modifiedAddress", modifiedAddress)
    setLocationDetails(modifiedAddress);
    setRegion(trackRegion);
  }
};

  return (
    <View style={style.mainWrapper}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={style.mapMainWrapper}>
        <MapView
          style={{flex: 1}}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          >
          {/* <Marker coordinate={region}>
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: 'red',
                borderRadius: 4,
              }}
            />
          </Marker> */}
        </MapView>
        <View style={style.centerPinWrapper}>
          <PickUpIcon height={moderateScale(30)} width={moderateScale(30)} />
        </View>
      </View>

      <View style={style.detailMainWrapper}>
        <TouchableOpacity
          style={[style.navigaionBtnWrapper, {left: scale(10)}]}
          onPress={goBack}>
          <ArrowLeftIcon
            size={moderateScale(18)}
            strokeWidth={1.7}
            style={style.backIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.navigaionBtnWrapper, {right: scale(10)}]}>
          <CurrentLocation
            height={scale(18)}
            width={scale(18)}
            style={style.backIcon}
          />
        </TouchableOpacity>

        <Text style={style.header}>Select your location</Text>

        <View style={style.locationCardWrapper}>
          <View style={style.pinLogoWrapper}>
            <PickUpIcon height={moderateScale(25)} width={moderateScale(25)} />
          </View>
          <View style={style.locationDetailWrapper}>
            <Text style={style.locationName}>
              {(locationDetails && locationDetails.street) ||
                'Pick from map'}
            </Text>
            {locationDetails && (
              <Text style={style.locationAddrres} numberOfLines={1}>
                {locationDetails.area || 'Fetching address...'}
              </Text>
            )}
          </View>
        </View>

        <CustomButton lable={'Select Pickup'} marginT={verticalScale(25)} />
      </View>
    </View>
  );
}

export default SelectOnMap;

const style = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: 'gray',
  },
  mapMainWrapper: {
    flex: 1,
    backgroundColor: 'gray',
    position: 'relative',
  },
  detailMainWrapper: {
    backgroundColor: ThemeColors.secondary,
    paddingHorizontal: scale(15),
    paddingVertical: scale(20),
    position: 'relative',
  },
  header: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: ThemeColors.text1,
  },
  locationCardWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8ff',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(8),
    borderRadius: scale(10),
    marginTop: verticalScale(10),
    borderWidth: 0.2,
    elevation: 2.5,
  },
  pinLogoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDetailWrapper: {
    flex: 9,
    justifyContent: 'center',
  },
  locationName: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: ThemeColors.text1,
  },
  locationAddrres: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: 'gray',
    marginTop: verticalScale(3),
    width: '90%',
  },
  navigaionBtnWrapper: {
    borderRadius: scale(50),
    backgroundColor: ThemeColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    position: 'absolute',
    top: scale(-40),
    elevation: 5,
    borderWidth: 0.3,
    borderColor: 'gray',
  },
  backIcon: {
    color: ThemeColors.text1,
    margin: scale(7),
  },
  centerPinWrapper: {
    position: 'absolute',
    // top: '52%',
    // left: '48%',
    // zIndex: 10,
    // marginLeft: -scale(12), // half of icon width
    // marginTop: -scale(24),
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -moderateScale(15)},
      {translateY: -moderateScale(30)},
    ],
    zIndex: 10,
  },
});
