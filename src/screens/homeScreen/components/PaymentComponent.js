import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {ThemeColors} from '../../../constant/Colors';
import Gpay from '../../../assets/images/svg/gPay.svg';
import Wallet from '../../../assets/images/svg/wallet.svg';
import Upi from '../../../assets/images/svg/upi.svg';
import Phonepe from '../../../assets/images/svg/phonepe.svg';
import Paytm from '../../../assets/images/svg/paytm.svg';
import Money from '../../../assets/images/svg/money.svg';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';


function PaymentModel({toggleCashModel, setPaymentMethod, paymentMethod}) {
  const imageSource = {
    'BlueTaxi Wallet': <Wallet height={scale(25)} width={scale(25)} />,
    GPay: <Gpay height={scale(25)} width={scale(25)} />,
    Phonepe: <Phonepe height={scale(25)} width={scale(25)} />,
    Paytm: <Paytm height={scale(25)} width={scale(25)} />,
    Cash: <Money height={scale(25)} width={scale(25)} />,
  };
  const PaymentMethodUi = ({title, balance}) => {
    const isSelected = paymentMethod === title;
    const onPress = () => {
      setPaymentMethod(title);
    };
    return (
      <TouchableOpacity
        style={[
          styles.PaymentMethodMainWrapper,
          {
            backgroundColor: isSelected ? '#f1f1f1' : '#fbfbfb',
            elevation: isSelected ? 5 : 2,
          },
        ]}
        onPress={onPress}>
        <View style={styles.PaymentMethodImageWrapper}>
          {imageSource[title]}
        </View>
        <View style={styles.PaymentMethodDetailWrapper}>
          <Text style={styles.PaymentMethodTitle}>{title}</Text>
          {balance && (
            <Text style={styles.PaymentMethodBalance}>{balance}</Text>
          )}
        </View>
        <View style={styles.PaymentMethodSwithWrapper}>
          <View
            style={[
              styles.PaymentBtnOutter,
              {
                borderColor: isSelected ? '#007fc8' : ThemeColors.text2,
                elevation: isSelected ? 5 : 1,
              },
            ]}>
            {isSelected && <View style={styles.PaymentBtnInner}></View>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
    <View style={styles.CMMainWrapper}>
      <View style={styles.CMHeaderWrapper}>
        <ArrowLeftIcon
          color={ThemeColors.text1}
          size={25}
          strokeWidth={2}
          onPress={toggleCashModel}
        />
        <Text style={styles.CMHeaderText}>Payments</Text>
      </View>
      <View style={styles.totalAmtWrapper}>
        <Text style={styles.totalAmtTxt}>Total Amount:</Text>
        <Text style={styles.totalAmtTxt}>₹25</Text>
      </View>
      <View style={styles.divider}></View>
      <Text style={styles.PaymentMethod}>Wallets</Text>
      <PaymentMethodUi
        title={'BlueTaxi Wallet'}
        balance={'Your Balance: ₹1500'}
      />
      <View style={styles.PaymentMethodWrapper}>
        <Upi
          height={scale(20)}
          width={scale(35)}
          style={{marginRight: scale(10)}}
        />

        <Text style={styles.PaymentMethod2}>Pay by UPI app</Text>
      </View>
      <PaymentMethodUi title={'GPay'} />
      <PaymentMethodUi title={'Phonepe'} />
      <PaymentMethodUi title={'Paytm'} />
      <Text style={styles.PaymentMethod}>Others</Text>
      <PaymentMethodUi title={'Cash'} />
    </View>
    </ScrollView>
  );
}
export default PaymentModel;

const styles = StyleSheet.create({
  CMMainWrapper: {
    flex: 1,
    backgroundColor: ThemeColors.secondary,
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    padding: scale(15),
  },
  CMHeaderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CMHeaderText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: ThemeColors.text1,
    marginLeft: scale(15),
  },
  totalAmtWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalAmtTxt: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: ThemeColors.text1,
    marginTop: verticalScale(15),
  },
  divider: {
    borderBottomWidth: 0.7,
    borderBottomColor: 'gary',
    marginTop: verticalScale(10),
    borderStyle: 'dashed',
  },
  PaymentMethodMainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    marginTop: verticalScale(13),
  },
  PaymentMethodDetailWrapper: {
    flex: 0.7,
    justifyContent: 'space-around',
  },
  PaymentMethodImageWrapper: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PaymentMethodSwithWrapper: {
    flex: 0.1,
    justifyContent: 'center',
  },
  PaymentMethodTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: ThemeColors.text1,
  },
  PaymentMethodBalance: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: 'gray',
    marginTop: verticalScale(3),
  },
  PaymentBtnOutter: {
    backgroundColor: ThemeColors.lightGray,
    borderRadius: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(18),
    width: scale(18),

    borderWidth: 3,
  },

  PaymentBtnInner: {
    backgroundColor: '#007fc8',
    borderRadius: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(10),
    width: scale(10),
  },
  PaymentMethod: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginTop: scale(20),
  },
  PaymentMethod2: {
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  PaymentMethodWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
});
