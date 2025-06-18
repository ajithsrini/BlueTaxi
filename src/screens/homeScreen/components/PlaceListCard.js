import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {scale, verticalScale} from 'react-native-size-matters';
import {ThemeColors} from '../../../constant/Colors';
import {useDispatch} from 'react-redux';
import {
  setPickupName,
  setDropName,
  setOrigin,
  setDestination,
} from '../../../slices/PickDropSlice';

function PlacelistCard({
  data,
  searchData,
  pickupDetector,
  activeInput,
}) {
  const dispatch = useDispatch();

  const setLocation = () => {
    if (activeInput === 'pickup') {
      dispatch(setOrigin({
        latitude: data.geometry.location.lat,
        longitude: data.geometry.location.lng,
        name: data.name,
        time: Date.now(),
      }));
    } else {
      dispatch(setDestination({
        latitude: data.geometry.location.lat,
        longitude: data.geometry.location.lng,
        name: data.name,
        time: Date.now(),
      }))
    }

    if (activeInput === 'pickup') {
      dispatch(setPickupName(data.name));
    } else {
      dispatch(setDropName(data.name));
    }
    searchData([]);
  };

  const pickupEditDetector = () => {
    pickupDetector();
  };

  return (
    <TouchableOpacity
      style={style.mainWapper}
      onPress={() => {
        setLocation();
        {
          pickupDetector && pickupEditDetector();
        }
      }}>
      <View style={style.kmWrapper}>
        <MapPinIcon size={scale(16)} style={style.mapPin} color={'gray'} />
        <Text style={style.km}>2.4 km</Text>
      </View>
      <View style={style.addressWrapper}>
        <Text style={style.name}>{data.name}</Text>
        <Text numberOfLines={1} style={style.address}>
          {data.formatted_address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default PlacelistCard;

const style = StyleSheet.create({
  mainWapper: {
    flexDirection: 'row',
    marginVertical: scale(10),
    alignItems: 'center',
  },
  kmWrapper: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressWrapper: {
    flex: 0.9,
    justifyContent: 'space-between',
    paddingLeft: scale(10),
    gap: scale(5),
  },
  km: {
    fontSize: scale(10),
    fontWeight: '500',
    color: 'gray',
    marginTop: scale(5),
  },
  name: {
    fontSize: scale(14),
    fontWeight: '600',
    color: ThemeColors.text1,
    width: '95%',
  },
  address: {
    fontSize: scale(12),
    color: 'gray',
    width: '90%',
  },
});
