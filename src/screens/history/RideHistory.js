import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Bars3Icon, ChevronDownIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import HistoryCard from './components/HistoryCard';
import {rides} from '../../constant/VehicleData';

function RideHistory({navigation}) {
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.blueBox}></View>
      <View style={style.contentView}>
        <Bars3Icon
          onPress={() => navigation.openDrawer()}
          color={ThemeColors.secondary}
          size={scale(27)}
          style={{marginLeft: scale(15)}}
        />
        <View style={style.headerWrapper}>
          <Text style={style.headerText}>History</Text>
          <View style={style.filterWrapper}>
            <Text style={style.dataAndTime}>Oct 15, 2018</Text>
            <ChevronDownIcon
              color={ThemeColors.secondary}
              size={scale(18)}
              strokeWidth={2}
            />
          </View>
        </View>
        <FlatList
          data={rides}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <HistoryCard data={item} />}
          showsVerticalScrollIndicator={false}
        
        />
      </View>
    </SafeAreaView>
  );
}
export default RideHistory;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeColors.lightBlue,
    position: 'relative',
  },
  blueBox: {
    width: '100%',
    height: '35%',
    backgroundColor: ThemeColors.primary,
    position: 'absolute',
  },
  contentView: {
    paddingTop: scale(15),
    flex: 1,
  },
  headerText: {
    fontSize: moderateScale(34),
    fontWeight: '600',
    color: ThemeColors.secondary,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: verticalScale(5),
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginBottom:verticalScale(25)
  },
  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000001a',
    borderRadius: scale(50),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    gap: scale(10),
  },
  dataAndTime: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: ThemeColors.secondary,
  },
});
