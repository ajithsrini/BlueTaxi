import {StyleSheet, Text, View} from 'react-native';
import {Bars3Icon, ChevronRightIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CoinSvg from '../../assets/images/svg/coin.svg';
import RupeesSvg from '../../assets/images/svg/rupees.svg';

function MyWallet({navigation}) {
  return (
    <SafeAreaView style={style.safeArea}>
      <View
        style={{
          height: verticalScale(200),
          width: '100%',
          backgroundColor: ThemeColors.primary,
          position: 'absolute',
        }}></View>
      <View style={style.mainWrapper}>
        <Bars3Icon
          color={ThemeColors.secondary}
          size={scale(28)}
          onPress={() => navigation.openDrawer()}
        />
        <View style={style.headerWrapper}>
          <Text style={style.headerText}>My Wallet</Text>
          <View style={style.coinCountWrapper}>
            <CoinSvg height={scale(19)} width={scale(19)} />
            <Text style={style.coinCount}>2500</Text>
          </View>
        </View>
        <View style={style.cashCardMainWrapper}>
          <View style={style.cashLogoRowWrapper}>
            <View style={style.cashLogoWrapper}>
              <RupeesSvg
                height={scale(40)}
                width={scale(40)}
                style={{margin: 5}}
              />
            </View>
            <View style={style.cashWrapper}>
              <Text style={style.cash}>Cash</Text>
              <Text style={style.DefaultPayment}>Default Payment Method</Text>
            </View>
          </View>
          <View style={style.divider} />

          <View style={style.cashDetailWrapper}>
            <View style={style.balanceWrapper}>
              <Text style={style.balanceText}>BALANCE</Text>
              <Text style={style.balanceAmount}>₹2500</Text>
            </View>
            <View style={style.expiresWrapper}>
              <Text style={style.expirsText}>EXPIRES</Text>
              <Text style={style.expirsDate}>09/21</Text>
            </View>
          </View>
        </View>
         <View style={style.couponWrapper}>
          <Text style={style.couponText}>Payment methods</Text>
          <View style={style.arrowWrapper}>
            <ChevronRightIcon size={scale(20)} strokeWidth={2} />
          </View>
        </View>
        <View style={style.couponWrapper}>
          <Text style={style.couponText}>Coupon</Text>
          <View style={style.arrowWrapper}>
            <Text style={style.couponCount}>3</Text>
            <ChevronRightIcon size={scale(20)} strokeWidth={2} />
          </View>
        </View>
        <View style={style.couponWrapper}>
          <Text style={style.couponText}>Intergal Mall</Text>
          <View style={style.arrowWrapper}>
            <Text style={style.couponCount}>4500</Text>
            <ChevronRightIcon size={scale(20)} strokeWidth={2} />
          </View>
        </View>
       
      </View>
    </SafeAreaView>
  );
}
export default MyWallet;

const style = StyleSheet.create({
  cashCardMainWrapper: {
    backgroundColor: ThemeColors.secondary,
    borderRadius: scale(10),
    elevation: 7,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  divider: {
    height: 0.4,
    backgroundColor: ThemeColors.text2,
  },
  cashLogoRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    padding: scale(15),
  },
  cashLogoWrapper: {
    backgroundColor: ThemeColors.lightBlue2,
    borderRadius: scale(50),
  },
  cashWrapper: {
    gap: scale(2),
  },
  cash: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: ThemeColors.text1,
  },
  DefaultPayment: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: "gray",
  },
  cashDetailWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
    paddingVertical: verticalScale(15),
    alignItems: 'center',
  },
  balanceWrapper: {
    gap: scale(3),
    alignItems: 'center',
  },
  expiresWrapper: {
    gap: scale(3),
    alignItems: 'center',
  },
  balanceText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: "gray",
  },
  balanceAmount: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: ThemeColors.primary,
  },

  expirsText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: "gray",
  },
  expirsDate: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: ThemeColors.text1,
  },
  couponWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  arrowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  couponText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: ThemeColors.text1,
  },
  couponCount: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: ThemeColors.primary,
  },

  safeArea: {
    flex: 1,
    backgroundColor: ThemeColors.secondary,
    position: 'relative',
  },
  mainWrapper: {
    padding: scale(15),
    gap: scale(5),
  },
  body: {
    flex: 0.88,
    backgroundColor: ThemeColors.secondary,
  },
  headerText: {
    fontSize: moderateScale(30),
    fontWeight: '600',
    color: ThemeColors.secondary,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinCountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000001a',
    borderRadius: scale(50),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    gap: scale(10),
  },
  coinCount: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: ThemeColors.secondary,
  },
});
