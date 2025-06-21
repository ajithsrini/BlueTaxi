import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Bars3Icon, ChevronRightIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {
  moderateScale,
  s,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const settingList = [
  {name: 'Notifications',id:1},
  {name: 'Security',id:2},
  {name: 'Clear cache',id:3},
  {name: 'Terms & Privacy Policy',id:4},
  {name: 'Contact us',id:5},
];



function Settings({navigation}) {
    const navigateToProfile=()=>{
    navigation.navigate("Profile")
}
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.blueBox}>
        <Bars3Icon
          color={ThemeColors.secondary}
          size={scale(28)}
          onPress={() => navigation.openDrawer()}
        />
        <Text style={style.headerText}>Settings</Text>
      </View>
      <View style={style.body}>
        <TouchableOpacity style={style.imageRowWrapper} onPress={navigateToProfile}>
          <View style={style.imageWrapper}>
            <Image
              source={require('../../assets/images/png/sampleUser.jpg')}
              style={style.image}
            />
            <View style={style.nameWrapper}>
              <Text style={style.name}>Ajith Srinivasan</Text>
              <Text style={style.memberType}>Gold Member</Text>
            </View>
          </View>
          <ChevronRightIcon
            size={scale(20)}
            strokeWidth={2}
            color={ThemeColors.primary}
          />
        </TouchableOpacity>
        {settingList.map(item => {
          return (
            <View style={style.settingWrapper} key={item.id}>
              <Text style={style.settingName}>{item.name}</Text>
              <ChevronRightIcon
                size={scale(20)}
                strokeWidth={2}
                color={ThemeColors.primary}
              />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
export default Settings;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeColors.primary,
  },
  blueBox: {
    backgroundColor: ThemeColors.primary,
    flex: 0.12,
    padding: scale(15),
    justifyContent:"center",
    gap: scale(5),
  },
  body: {
    flex: 0.88,
    backgroundColor: ThemeColors.secondary,
    padding: scale(10),
  },
  headerText: {
    fontSize: moderateScale(30),
    fontWeight: '600',
    color: ThemeColors.secondary,
  },
  imageRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:verticalScale(25),
    paddingHorizontal:scale(5),
    marginTop:verticalScale(10)
  },
  image: {
    height: scale(70),
    width: scale(70),
    borderRadius: scale(35),
    borderWidth: 2,
    borderColor: 'lightgray',
  },
  imageWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(5),
  },
  name: {
    fontSize: scale(18),
    fontWeight: '600',
    color: ThemeColors.text1,
    marginLeft: scale(10),
  },
  memberType: {
    fontSize: scale(14),
    fontWeight: '400',
    color: "gray",
    marginLeft: scale(10),
    letterSpacing:1
  },
  nameWrapper: {
    justifyContent: 'center',
  },
  settingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:verticalScale(15),
    paddingHorizontal:scale(5)
  },
  settingName: {
    fontSize: scale(16),
    fontWeight: '400',
    color: ThemeColors.text1,
  },
});
