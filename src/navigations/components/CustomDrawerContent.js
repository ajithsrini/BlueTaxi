import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, StyleSheet, Text, Image} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {ThemeColors} from '../../constant/Colors';
import HistoryIcon from '../../assets/images/svg/history.svg';
import HistoryIconBlack from '../../assets/images/svg/pastTime.svg';
import {
  HomeIcon,
  WalletIcon,
  BellAlertIcon,
  GifIcon,
  GiftIcon,
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  WalletIcon as WalletIconSolid,
  BellAlertIcon as BellAlertIconSolid,
  GifIcon as GifIconSolid,
  GiftIcon as GiftIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  ArrowRightEndOnRectangleIcon as ArrowRightEndOnRectangleIconSolid,
} from 'react-native-heroicons/solid';

export default function CustomDrawerContent(props) {
  const {state, navigation, descriptors} = props;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContentContainerStyle}>
      {/* Header */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/png/sampleUser.jpg')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>Ajith Srinivasan</Text>
        <View style={styles.cashWrapper}>
          <Text style={styles.cash}>Cash Balance : </Text>
          <Text style={styles.cashAmount}>₹1800</Text>
          <ChevronRightIcon color={ThemeColors.lightBlue} size={scale(18)} />
        </View>
      </View>

      {/* Custom Drawer Items */}
      <View style={styles.drawerListWrapper}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const {drawerLabel, title, drawerIcon} =
            descriptors[route.key].options;

          const icons = {
            Home: HomeIcon,
            'My Wallet': WalletIcon,
            Notifications: BellAlertIcon,
            History: GifIcon,
            Settings: Cog6ToothIcon,
            Logout: ArrowRightEndOnRectangleIcon,
            'Invite Friends': GiftIcon,
          };
          const iconsSolid = {
            Home: HomeIconSolid,
            'My Wallet': WalletIconSolid,
            Notifications: BellAlertIconSolid,
            History: GifIconSolid,
            Settings: Cog6ToothIconSolid,
            Logout: ArrowRightEndOnRectangleIconSolid,
            'Invite Friends': GiftIconSolid,
          };

          const IconComponent = isFocused
            ? iconsSolid[route.name]
            : icons[route.name];

          return (
            <DrawerItem
              key={route.key}
              label={() => (
                <View style={styles.lableWrapper}>
                  {route.name === 'History' ? (
                    isFocused ? (
                      <HistoryIcon height={scale(17)} width={scale(17)} />
                    ) : (
                      <HistoryIconBlack height={scale(17)} width={scale(17)} />
                    )
                  ) : (
                    <IconComponent
                      size={scale(19)}
                      color={isFocused ? ThemeColors.primary : 'black'}
                    />
                  )}
                  <Text
                    style={[
                      styles.labelStyle,
                      isFocused && styles.activeLabel,
                    ]}>
                    {drawerLabel ?? title ?? route.name}
                  </Text>
                </View>
              )}
              icon={drawerIcon}
              focused={isFocused}
              onPress={() => navigation.navigate(route.name)}
              style={styles.drawerItem}
            />
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  imageWrapper: {
    width: '95%',
    backgroundColor: ThemeColors.lightBlue2,
    padding: scale(15),
    borderRadius: scale(10),
    alignSelf: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: ThemeColors.secondary,
  },
  userImage: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(50),
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    color: ThemeColors.text1,
    fontSize: scale(16),
    fontWeight: '600',
    marginTop: verticalScale(10),
  },
  cashWrapper: {
    backgroundColor: ThemeColors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    alignItems: 'center',
    borderRadius: scale(10),
    marginTop: verticalScale(10),
    elevation: 5,
    flexDirection: 'row',
    gap: scale(5),
    borderWidth: 1,
    borderColor: 'white',
  },
  cash: {
    color: ThemeColors.lightBlue,
    fontSize: scale(14),
    fontWeight: '600',
  },
  cashAmount: {
    color: ThemeColors.lightBlue,
    fontSize: scale(15),
    fontWeight: '700',
  },
  drawerListWrapper: {
    // paddingHorizontal: scale(10),
    paddingTop: verticalScale(5),
    // backgroundColor:"blue"
  },
  drawerItem: {
    borderRadius: scale(8),
    marginVertical: scale(4),
    backgroundColor: 'white',
  },
  lableWrapper: {
    flexDirection: 'row',
    gap: scale(10),
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: scale(14),
    color: 'black',
    fontWeight: '400',
  },
  activeLabel: {
    color: ThemeColors.primary,
    fontWeight: '600',
  },
  drawerContentContainerStyle: {
    flex: 1,
  },
});
