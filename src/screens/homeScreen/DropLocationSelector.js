import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeftIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ExclamationCircleIcon, MapIcon} from 'react-native-heroicons/outline';
import {useCallback, useContext, useEffect, useState} from 'react';
import PlaceSeachTextInput from './components/PlaceSeachTextInput';
import PlacelistCard from './components/PlaceListCard';
import {LocationContext} from '../../context/LocationContext';
import {getAddressFromCoords} from '../../utils/MapUtils';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  setPickupName,
  setDropName,
  setOrigin,
  resetCoordinates,
  resetNames,
} from '../../slices/PickDropSlice';
function DropLocationSelector({navigation}) {
  const {
    pickupCon,
    pickupEdited,
    setPickupEdited,
    pickupSelectedFromList,
    setPickupSelectedFromList,
  } = useContext(LocationContext);
  console.log('pickup con', pickupCon);

  const dispatch = useDispatch();

  const {pickupName, dropName, origin, destination} = useSelector(
    state => state.PickDrop,
  );

  const [pickupSeachResult, SetPickupSeachResult] = useState([]);
  const [dropSeachResult, SetDropSeachResult] = useState([]);

  const [activeInput, setActiveInput] = useState(null);
  // const [pickupEdited, setPickupEdited] = useState(false);
  // const [pickupSelectedFromList, setPickupSelectedFromList] = useState(false);

  const backNavigation = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    const setPickupFromCurret = async () => {
      if (pickupCon?.latitude && pickupCon?.longitude) {
        const response = await getAddressFromCoords(
          pickupCon.latitude,
          pickupCon.longitude,
        );
        console.log('address getted', response);
        dispatch(
          setOrigin({
            latitude: pickupCon.latitude,
            longitude: pickupCon.longitude,
            name: response,
            time: Date.now(),
          }),
        );
        dispatch(setPickupName('Your current location'));
        console.log('your curret location setting ');
      }
    };
    setPickupFromCurret();
  }, [pickupCon]);

  useEffect(() => {
    if (activeInput === 'drop' && pickupEdited && !pickupSelectedFromList) {
      dispatch(setPickupName('Your current location'));
      dispatch(setOrigin(pickupCon));
    }
  }, [activeInput]);

  const pickEditDetector = () => {
    // console.log('while selecting the pickup location');
    setPickupSelectedFromList(true);
    setPickupEdited(false);
  };

  const navigateToRideDetail = () => {
    if (
      origin?.latitude &&
      origin?.longitude &&
      origin?.name &&
      destination?.latitude &&
      destination?.longitude &&
      destination?.name
    ) {
      navigation.replace('RideDetails', {
        pickupLocation: origin,
        dropLocation: destination,
      });
      dispatch(resetCoordinates());
      dispatch(resetNames());
      // console.log('Navigating to RideDetails', origin, destination);
      console.log('destination item', destination.time);
    } else {
      ToastAndroid.show('Please select your drop location', ToastAndroid.SHORT);
    }
  };

  const navigateToSelectOnMap = () => {
    navigation.navigate('SelectOnMap', {activeInput: activeInput});
    activeInput === 'pickup'
      ? SetPickupSeachResult([])
      : SetDropSeachResult([]);
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <StatusBar barStyle={'dark-content'} />
      <View style={style.headerWrapper}>
        <ArrowLeftIcon
          color={ThemeColors.text1}
          size={24}
          onPress={backNavigation}
        />
        <Text style={style.title}>Drop</Text>
        <Text
          style={[
            style.continue,
            {
              color:
                origin?.latitude &&
                origin?.longitude &&
                origin?.name &&
                destination?.latitude &&
                destination?.longitude &&
                destination?.name
                  ? ThemeColors.primary
                  : 'lightgray',
            },
          ]}
          onPress={navigateToRideDetail}>
          Continue
        </Text>
      </View>
      <View style={style.lcPickerMainWrapper}>
        {pickupCon?.latitude == null ? (
          <View style={style.warningWrapper}>
            <ExclamationCircleIcon color={'#cf6f32'} />
            <View style={{width: '90%', marginLeft: scale(5)}}>
              <Text style={style.waringText}>
                We can't find you! Enter your pickup location for a smooth ride
              </Text>
            </View>
          </View>
        ) : null}
        <View style={style.pickDropLogoWrapper}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: scale(5),
            }}>
            <MapPinIcon color={'green'} style={{opacity: 0.7}} />

            <PlaceSeachTextInput
              placeholder={'Pickup location'}
              searchResult={
                activeInput === 'pickup'
                  ? SetPickupSeachResult
                  : SetDropSeachResult
              }
              value={pickupName}
              setter={text => {
                dispatch(setPickupName(text));
                setPickupEdited(true);
                setPickupSelectedFromList(false);
              }}
              userCurrentLocation={pickupCon}
              onFocus={() => {
                setActiveInput('pickup');
                setPickupEdited(false); // reset edit state
                setPickupSelectedFromList(false); // reset selection
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 2,
              paddingLeft: scale(5),
            }}>
            <MapPinIcon color={'red'} style={{opacity: 0.7}} />
            <PlaceSeachTextInput
              placeholder={'Drop location'}
              searchResult={
                activeInput === 'pickup'
                  ? SetPickupSeachResult
                  : SetDropSeachResult
              }
              value={dropName}
              setter={text => dispatch(setDropName(text))}
              userCurrentLocation={pickupCon}
              onFocus={() => setActiveInput('drop')}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={style.selectMapWapper}
        onPress={navigateToSelectOnMap}>
        <MapIcon color={'gray'} size={scale(15)} />
        <Text style={style.selectMapText}>Select on map</Text>
      </TouchableOpacity>
      <View style={style.divider}></View>
      <TouchableOpacity
        style={{flex: 1, paddingTop: verticalScale(10)}}
        onPress={Keyboard.dismiss}>
        <FlatList
          data={activeInput === 'pickup' ? pickupSeachResult : dropSeachResult}
          keyExtractor={(item, index) => `${item.place_id} - ${index}`}
          renderItem={({item}) => (
            <PlacelistCard
              data={item}
              searchData={
                activeInput === 'pickup'
                  ? SetPickupSeachResult
                  : SetDropSeachResult
              }
              activeInput={activeInput}
              pickupDetector={pickEditDetector}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default DropLocationSelector;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
    marginTop: verticalScale(15),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginLeft: scale(10),
    color: ThemeColors.text1,
  },
  continue: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    position: 'absolute',
    right: scale(10),
  },
  lcPickerMainWrapper: {
    width: '95%',
    alignSelf: 'center',
    // height: verticalScale(110),
    borderRadius: scale(15),
    backgroundColor: '#faf2ca',
    marginTop: verticalScale(10),
    
  },
  warningWrapper: {
    borderTopRightRadius: scale(15),
    borderTopLeftRadius: scale(15),
    flexDirection: 'row',
    backgroundColor: '#faf2ca',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
  },

  pickDropLogoWrapper: {
    backgroundColor: '#eaeaeaff',
    justifyContent: 'center',
    borderRadius: scale(15),
    borderWidth: 0.5,
    borderColor: 'gray',
    // height: verticalScale(65),
  },
  waringText: {
    color: '#5d5528',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  selectMapWapper: {
    flexDirection: 'row',
    borderRadius: scale(15),
    borderWidth: 0.5,
    borderColor: 'gray',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(7),
    marginTop: verticalScale(15),
    marginLeft: scale(10),
    backgroundColor:"#eaeaeaff"
  },
  selectMapText: {
    color: ThemeColors.text1,
    fontSize: moderateScale(12),
    fontWeight: '400',
    marginLeft: scale(5),
  },
  divider: {
    borderBottomWidth: 0.7,
    borderBottomColor: 'gary',
    marginTop: verticalScale(10),
  },
});
