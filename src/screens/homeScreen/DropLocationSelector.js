import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeftIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ExclamationCircleIcon, MapIcon} from 'react-native-heroicons/outline';
import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlaceSeachTextInput from '../../components/PlaceSeachTextInput';
import PlacelistCard from '../../components/PlaceListCard';

function DropLocationSelector({navigation}) {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const response = await AsyncStorage.multiGet(['latitude', 'longitude']);
        console.log('async location', response[0][1]);
        console.log('async location', response[1][1]);
        setCurrentLocation({
          latitude: response[0][1],
          longitude: response[1][1],
        });
      } catch (er) {
        console.error('async storage errror', er);
      }
    };
    fetchCurrentLocation();
  }, []);

  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [seachResult, setSeachResult] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const backNavigation = useCallback(() => {
    navigation.goBack();
  }, []);

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
      </View>
      <View style={style.lcPickerMainWrapper}>
        <View style={style.warningWrapper}>
          <ExclamationCircleIcon color={'#cf6f32'} />
          <View style={{width: '90%', marginLeft: scale(5)}}>
            <Text style={style.waringText}>
              We can't find you! Enter your pickup location for a smooth ride
            </Text>
          </View>
        </View>
        <View style={style.pickDropLogoWrapper}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: scale(5),
            }}>
            <MapPinIcon color={'green'} style={{opacity: 0.8}} />
            
              <PlaceSeachTextInput
                placeholder={'Pickup location'}
                searchResult={setSeachResult}
                value={pickup}
                setter={setPickup}
                userCurrentLocation={currentLocation}
                onFocus={() => setActiveInput('pickup')}
              />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 2,
              paddingLeft: scale(5),
            }}>
            <MapPinIcon color={'red'} style={{opacity: 0.8}} />
            <PlaceSeachTextInput
              placeholder={'Drop location'}
              searchResult={setSeachResult}
              value={drop}
              setter={setDrop}
              userCurrentLocation={currentLocation}
              onFocus={() => setActiveInput('drop')}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={style.selectMapWapper}>
        <MapIcon color={'gray'} size={scale(15)} />
        <Text style={style.selectMapText}>Select on map</Text>
      </TouchableOpacity>
      <View style={style.divider}></View>
      <TouchableOpacity
        style={{flex: 1, paddingTop: verticalScale(10)}}
        onPress={Keyboard.dismiss}>
        <FlatList
          data={seachResult}
          keyExtractor={(item, index) => `${item.place_id} - ${index}`}
          renderItem={({item}) => (
            <PlacelistCard
              data={item}
              locationSetter={
                activeInput === 'pickup' ? setOrigin : setDestination
              }
              inputSetter={activeInput === 'pickup' ? setPickup : setDrop}
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
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginLeft: scale(10),
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
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(7),
    marginTop: verticalScale(15),
    marginLeft: scale(10),
  },
  selectMapText: {
    color: 'gray',
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginLeft: scale(5),
  },
  divider: {
    borderBottomWidth: 0.7,
    borderBottomColor: 'gary',
    marginTop: verticalScale(10),
  },
});
