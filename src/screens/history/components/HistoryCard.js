import {StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {ThemeColors} from '../../../constant/Colors';
import {MapPinIcon, ArrowLongDownIcon} from 'react-native-heroicons/solid';
import {
  ChevronRightIcon,
  CurrencyRupeeIcon,
} from 'react-native-heroicons/outline';

function HistoryCard({data}) {
  const statusColor =
    data.status === 'Cancelled'
      ? '#ff0000'
      : data.status === 'Completed'
      ? '#03de73'
      : '#4252ff';
  return (
    <View style={style.mainWrapper}>
      <View style={style.detailWrapper}>
        <View style={style.originWrapper}>
          {/* <PickUpIcon height={scale(25)} width={scale(25)} /> */}
          <MapPinIcon color={"#4252ff"} />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={style.address}>
              {data.origin}
            </Text>
          </View>
        </View>
        <ArrowLongDownIcon
          color={'lightgray'}
          style={{marginVertical: scale(3)}}
        />
        <View style={style.originWrapper}>
          <MapPinIcon color={'#fb4d4d'} />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={style.address}>
              {data.destination}
            </Text>
          </View>
        </View>
      </View>
      <View style={style.priceRowWrapper}>
        <View style={style.priceWrapper}>
          <CurrencyRupeeIcon color={'#1eef1e'} />
          <Text style={style.price}>₹{data.price}</Text>
        </View>
        <View style={style.statusWrapper}>
          <Text style={[style.status, {color: statusColor}]}>
            {data.status}
          </Text>
          <ChevronRightIcon size={scale(18)} strokeWidth={2} color={'gray'} />
        </View>
      </View>
    </View>
  );
}
export default HistoryCard;

const style = StyleSheet.create({
  mainWrapper: {
    backgroundColor: ThemeColors.secondary,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: scale(10),
    marginBottom: verticalScale(12),
    elevation: 5,
    width:"93%",
    alignSelf:"center"
  },
  detailWrapper: {
    paddingVertical: scale(15),
    paddingHorizontal: scale(10),
  },
  originWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: scale(14),
    fontWeight: '500',
    color: ThemeColors.text1,
    marginLeft: scale(10),
    width: '80%',
  },
  priceRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
    borderTopWidth: 0.5,
    borderTopColor: 'lightgray',
    // marginTop:verticalScale(10)
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  price: {
    fontSize: scale(14),
    fontWeight: '500',
    color: ThemeColors.text1,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
  },
  status: {
    fontSize: scale(14),
    fontWeight: '500',
  },
});
