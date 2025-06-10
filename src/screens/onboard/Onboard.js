import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Onboarding from 'react-native-onboarding-swiper';
import {scale, verticalScale} from 'react-native-size-matters';
import {ThemeColors} from '../../constant/Colors';
import {useCallback} from 'react';

function Onboard({navigation}) {
  const handleNavigation = useCallback(() => {
    navigation.replace('LocationGetter');
  }, [navigation]);

  const NextBtn = useCallback(() => {
    return (
      <View style={style.NextBtnWrapper}>
        <Text style={style.btnText}>Next</Text>
      </View>
    );
  }, []);

  const Done = ({...props}) => (
    <TouchableOpacity
      style={style.doneBtnWrapper}
      {...props}>
      <Text style={style.btnText}>Finish</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={style.safeArea}>
      <Onboarding
        bottomBarColor={ThemeColors.secondary}
        onSkip={handleNavigation}
        onDone={handleNavigation}
        nextLabel=<NextBtn />
        DoneButtonComponent={Done}
        titleStyles={{
          color: ThemeColors.primary,
          fontWeight: '700',
          fontSize: verticalScale(20),
        }}
        pages={[
          {
            backgroundColor: ThemeColors.secondary,
            image: (
              <Image
                source={require('../../assets/images/png/request.png')}
                style={{height: scale(278), width: scale(278)}}
              />
            ),
            title: 'Request Ride',
            subtitle: `Request a ride get picked up by a
nearby community driver`,
          },
          {
            backgroundColor: ThemeColors.secondary,
            image: (
              <Image
                source={require('../../assets/images/png/confirm.png')}
                style={{height: scale(278), width: scale(278)}}
              />
            ),
            title: 'Confirm Your Driver',
            subtitle: `Huge drivers network helps you find
comforable, safe and cheap ride`,
          },
          {
            backgroundColor: ThemeColors.secondary,
            image: (
              <Image
                source={require('../../assets/images/png/track.png')}
                style={{height: scale(278), width: scale(278)}}
              />
            ),
            title: 'Track your ride',
            subtitle: `Know your driver in advance and be
able to view current location in real time
on the map`,
          },
        ]}
      />
    </SafeAreaView>
  );
}

export default Onboard;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: verticalScale(10),
  },
  btnText: {
    color: ThemeColors.secondary,
    fontSize: verticalScale(14),
    marginVertical: verticalScale(3),
    marginHorizontal: scale(10),
    fontWeight: '500',
  },
  NextBtnWrapper: {
    backgroundColor: ThemeColors.primary,
    borderRadius: scale(10),
  },
  doneBtnWrapper:{
        backgroundColor: ThemeColors.primary,
        borderRadius: scale(10),
        marginRight: verticalScale(15),
      }
});
