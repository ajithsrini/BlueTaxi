import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useCallback, useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import SignUpComponent from './SignUpComponent';
import LoginComponent from './LoginComponent';

function Authentication({navigation}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderScene = SceneMap({
    first: () => <SignUpComponent navigation={navigation} />,
    second: () => <LoginComponent navigation={navigation} />,
  });

  const routes = [
    {key: 'first', title: 'Sign Up'},
    {key: 'second', title: 'Sign In'},
  ];

  return (
    <View style={style.mainWrapper}>
      <View style={style.loginWrapper}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          style={style.tabView}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={style.tabIndicator}
              style={style.tabBar}
              activeColor={ThemeColors.text1}
              inactiveColor={ThemeColors.text2}
              pressColor={ThemeColors.text2}
              pressOpacity={0.5}
              contentContainerStyle={{height: verticalScale(50)}}
            />
          )}
        />
      </View>
      <View style={style.imgWrapper}>
        <Image
          source={require('../../assets/images/png/flashBg.png')}
          style={style.flashBg}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/images/png/logo.png')}
          style={style.logo}
          resizeMode="contain"
        />
      </View>
      <View style={style.bottomWrapper}>
        <Text style={style.terms}>
          By clicking start, you agree to our{' '}
          <Text style={style.termsBold}>Terms and Conditions</Text>
        </Text>
      </View>
    </View>
  );
}

export default Authentication;

const style = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    position: 'relative',
  },
  imgWrapper: {
    flex: 0.5,
    backgroundColor: ThemeColors.primary,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  flashBg: {
    width: '100%',
    height: '57%',
  },
  logo: {
    width: scale(265),
    height: verticalScale(149),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -scale(265) / 2},
      {translateY: -verticalScale(149) / 2},
    ],
  },
  bottomWrapper: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  terms: {
    fontWeight: '400',
    fontSize: moderateScale(12),
    marginBottom: verticalScale(5),
    color: ThemeColors.text1,
  },
  termsBold: {
    fontWeight: '600',
  },
  loginWrapper: {
    position: 'absolute',
    height: verticalScale(280),
    width: '85%',
    left: '7%',
    top: '50%',
    transform: [{translateY: -280 / 2}],
    zIndex: 10,
    borderRadius: scale(10),
    elevation: 10,
  },
  tabView: {
    borderRadius: scale(10),
  },
  tabIndicator: {
    backgroundColor: ThemeColors.primary,
  },
  tabBar: {
    backgroundColor: ThemeColors.secondary,
  },
});
