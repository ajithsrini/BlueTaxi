import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Bars3Icon, ChevronRightIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {TrashIcon} from 'react-native-heroicons/solid';
import NotificationCard from './NotificationCard';
import {notificationDummydata} from '../../constant/VehicleData';

function Notification({navigation}) {
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.blueBox}>
        <Bars3Icon
          color={ThemeColors.secondary}
          size={scale(28)}
          onPress={() => navigation.openDrawer()}
        />
        <View style={style.headerWrapper}>
          <Text style={style.headerText}>Notifications</Text>
          <TrashIcon color={'lightgray'} size={scale(24)} />
        </View>
      </View>
      <View style={style.body}>
        <FlatList
          data={notificationDummydata}
          keyExtractor={(item, index) => `${item.id} - ${index}`}
          renderItem={({item}) => <NotificationCard data={item}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical:scale(10)}}
        />
      </View>
    </SafeAreaView>
  );
}
export default Notification;

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
});
