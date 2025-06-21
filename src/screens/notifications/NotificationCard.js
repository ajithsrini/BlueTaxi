import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {ThemeColors} from '../../constant/Colors';
import TiclIcon from '../../assets/images/svg/Tick.svg';
import CancelIcon from '../../assets/images/svg/cancel.svg';
import PromoBlueIcon from '../../assets/images/svg/promoBlue.svg';
import TransactionIcon from '../../assets/images/svg/wallet.svg';

export default function NotificationCard({data}) {
  const icon = {
    SystemSuccess: (
      <TiclIcon
        height={scale(25)}
        width={scale(25)}
        style={{alignSelf: 'center'}}
      />
    ),
    SystemCancel: (
      <CancelIcon
        height={scale(25)}
        width={scale(25)}
        style={{alignSelf: 'center'}}
      />
    ),
    Promotion: (
      <PromoBlueIcon
        height={scale(25)}
        width={scale(25)}
        style={{alignSelf: 'center'}}
      />
    ),
    Transaction: (
      <TransactionIcon
        height={scale(25)}
        width={scale(25)}
        style={{alignSelf: 'center'}}
      />
    ),
  };
  return (
    <View style={style.mainWrapper}>
      <View style={style.logoWrapper}>
        {data.title?.toLowerCase() === 'promotion' && icon.Promotion}
        {data.title?.toLowerCase() === 'transaction' && icon.Transaction}
        {data.title?.toLowerCase() === 'system' &&
          ['confirmed', 'completed'].includes(data.status) &&
          icon.SystemSuccess}
        {data.title?.toLowerCase() === 'system' &&
          ['cancelled', 'rejected'].includes(data.status) &&
          icon.SystemCancel}
      </View>
      <View style={style.detailWrapper}>
        <Text style={style.title}>{data.title}</Text>
        <Text style={style.message} numberOfLines={1}>
          {data.message}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.lightBlue2,
    paddingVertical: scale(15),
    paddingHorizontal: scale(15),
    alignSelf: 'flex-start',
  },
  logoWrapper: {
    height: scale(50),
    width: scale(50),
    backgroundColor: ThemeColors.lightBlue,
    borderRadius: scale(50),
    justifyContent: 'center',
  },
  detailWrapper: {
    gap: scale(10),
    marginLeft: scale(12),
    flex: 1,
    // justifyContent:"space-between"
  },
  title: {
    fontSize: scale(15),
    fontWeight: '600',
    color: ThemeColors.text1,
  },
  message: {
    fontSize: scale(13),
    fontWeight: '400',
    color: ThemeColors.text1,
    // width:"95%"
  },
});
