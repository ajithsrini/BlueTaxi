import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Bars3Icon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import InviteFriendSvg from '../../assets/images/svg/inviteFriend.svg';
import CustomButton from '../../components/CustomButton';

function InviteFriends({navigation}) {
  return (
    <SafeAreaView style={style.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex:1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : verticalScale(20)}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={style.header}>
              <View style={style.headerRowWrapper}>
                <Bars3Icon
                  onPress={() => navigation.openDrawer()}
                  style={style.drawerIcon}
                  size={scale(28)}
                />
                <Text style={style.headerText}>Invite Friends</Text>
              </View>
              <View style={style.imageWrapper}>
                <InviteFriendSvg width={scale(376)} height={scale(326)} />
              </View>
              <View>
                <Text style={style.offerMessage}>
                  {`Invite Friends\nGet 3 Coupons each!`}
                </Text>
                <Text style={style.offerSubMessage}>
                  {`When your friend sign up with your referral code,\nyou'll both get 3.0 coupons`}
                </Text>
              </View>
            </View>
            <View style={style.body}>
              <Text style={style.shareCodeText}>Share your invite code</Text>
              <TextInput
                placeholder="Enter your invite code"
                placeholderTextColor={ThemeColors.text2}
                style={style.textInput}
              />
              <CustomButton lable={'Invite Friends'} marginT={verticalScale(15)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default InviteFriends;


const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeColors.primary,
  },
  header: {
    flex: 0.7,
    backgroundColor: ThemeColors.primary,
    padding: scale(15),
    justifyContent: 'space-between',
  },
  body: {
    flex: 0.3,
    backgroundColor: 'white',
    padding: scale(15),
    gap: verticalScale(20),
    justifyContent: 'center',
  },
  shareCodeText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: ThemeColors.text1,
  },
  textInput: {
    borderBottomColor: ThemeColors.text1,
    borderBottomWidth: 1,
    fontSize: moderateScale(16),
  },
  headerRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    color: ThemeColors.secondary,
  },
  drawerIcon: {
    color: ThemeColors.secondary,
    position: 'absolute',
    left: 0,
  },
  imageWrapper: {
    alignSelf: 'center',
  },
  offerMessage: {
    alignSelf: 'center',
    fontSize: moderateScale(25),
    fontWeight: '600',
    color: ThemeColors.secondary,
    textAlign: 'center',
  },
  offerSubMessage: {
    alignSelf: 'center',
    fontSize: moderateScale(14),
    marginTop: verticalScale(5),
    fontWeight: '400',
    color: 'lightgray',
    textAlign: 'center',
  },
});
