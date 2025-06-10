import React, {useCallback, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ThemeColors} from '../../constant/Colors';
import {scale, verticalScale} from 'react-native-size-matters';

function Splash({navigation}) {
  const handleNavigation = useCallback(() => {
    navigation.replace('Onboard');
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      handleNavigation();
    }, 3000);
  }, []);

  return (
    <View style={style.mainWrapper}>
      <Image
        source={require('../../assets/images/png/logo.png')}
        style={style.logo}
      />
      <Image
        source={require('../../assets/images/png/flashBg.png')}
        style={style.flashBg}
      />
    </View>
  );
}

export default Splash;

const style = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: ThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: scale(226),
    height: verticalScale(149),
    resizeMode: 'contain',
  },
  flashBg: {
    width: '100%',
    height: scale(170),
    position: 'absolute',
    bottom: 0,
  },
});
