import {StyleSheet, TextInput, View} from 'react-native';
import {ThemeColors} from '../constant/Colors';
import {GOOGLE_MAPS_APIKEY} from '../utils/MapUtils';
import {moderateScale, scale} from 'react-native-size-matters';

function PlaceSeachTextInput({
  placeholder,
  searchResult,
  value,
  setter,
  userCurrentLocation,
  onFocus,
  onBlur
}) {
  const apiKey = GOOGLE_MAPS_APIKEY;
  
  const googleApisUrl =
    'https://maps.googleapis.com/maps/api/place/textsearch/json';

  const INITIAL_LAT = 11.9386981;
  const INITIAL_LNG = 79.8320056;

  const searchPlaces = async query => {
    if (!query.trim()) {
        searchResult([])
        return
    };

    const input = encodeURIComponent(query.trim());

    const lat = userCurrentLocation?.latitude || INITIAL_LAT;
    const lng = userCurrentLocation?.longitude || INITIAL_LNG;
    const radius = 4000;
    // console.log(userCurrentLocation)

    const url = `${googleApisUrl}?query=${input}&location=${lat},${lng}&radius=${radius}&key=${apiKey}`;

    try {
      const resp = await fetch(url);
      const json = await resp.json();

      if (json && json.results) {
        // console.log('result', json.results);
        searchResult(json.results);
      }
    } catch (e) {
      console.log('Search error:', e);
    }
  };

  return (
    <View 
    style={{flex:1}}>
      <TextInput
        placeholder={placeholder || 'Enter text'}
        style={style.textInput}
        value={value}
        onChangeText={text => {
          searchPlaces(text);
          setter();
        }}
        placeholderTextColor={'gray'}
        cursorColor={ThemeColors.primary}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
}

export default PlaceSeachTextInput;

const style = StyleSheet.create({
  textInput: {
    marginLeft: scale(10),
    color: ThemeColors.text1,
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
});
