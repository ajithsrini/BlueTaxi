import {Image, StyleSheet, Text, View} from 'react-native';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

function Profile({navigation}) {
  const renderDetails = [
    {title: 'Level', value: 'Gold Member', id: 1},
    {title: 'Name', value: 'Ajith Srinivasan', id: 2},
    {title: 'Email', value: 'ajithsrini31@gmail.com', id: 3},
    {title: 'Gender', value: 'Male', id: 4},
    {title: 'Date of birth', value: 'July 31, 2001', id: 5},
    {title: 'Phone number', value: '+91 9876543210', id: 6},
  ];
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.blueBox}>
        <ChevronLeftIcon
          color={ThemeColors.secondary}
          size={scale(28)}
          onPress={() => navigation.goBack()}
        />
        <View style={style.headerWrapper}>
          <Text style={style.headerText}>My Account</Text>
          <Image
            source={require('../../assets/images/png/sampleUser.jpg')}
            style={style.image}
          />
        </View>
      </View>
      <View style={style.body}>
        {renderDetails.map(item => {
          return (
            <View style={style.detailRow} key={item.id}>
              <Text style={style.detailTitleText}>{item.title}</Text>
              <View style={style.detailWrapper}>
                <Text style={style.detailText}>{item.value}</Text>
                <ChevronRightIcon
                  size={scale(20)}
                  strokeWidth={2}
                  color={ThemeColors.primary}
                />
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
export default Profile;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeColors.primary,
  },
  blueBox: {
    backgroundColor: ThemeColors.primary,
    flex: 0.12,
    padding: scale(15),
    justifyContent: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flex: 0.88,
    backgroundColor: ThemeColors.secondary,
    paddingHorizontal:scale(15),
    paddingVertical:verticalScale(5)
  },
  headerText: {
    fontSize: moderateScale(30),
    fontWeight: '600',
    color: ThemeColors.secondary,
  },
  image: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    borderWidth: 2,
    borderColor: ThemeColors.secondary,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  detailTitleText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: ThemeColors.text1,
  },
  detailText: {
    fontSize: moderateScale(15),
    fontWeight: '400',
    color: 'gray',
  },
  detailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
});
