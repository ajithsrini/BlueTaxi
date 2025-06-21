import {createDrawerNavigator} from '@react-navigation/drawer';
import AppStack from './AppStack';
import CustomDrawerContent from './components/CustomDrawerContent';
import MyWallet from '../screens/walletScreen/MyWallet';
import RideHistory from '../screens/history/RideHistory';
import Notification from '../screens/notifications/Notification';
import InviteFriends from '../screens/inviteFriends/InviteFriends';
import Settings from '../screens/settings/Settings';
import Logout from '../screens/logout/Logout';
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={AppStack} />
      <Drawer.Screen name="My Wallet" component={MyWallet} />
      <Drawer.Screen name="History" component={RideHistory} />
      <Drawer.Screen name="Notifications" component={Notification} />
      <Drawer.Screen name="Invite Friends" component={InviteFriends} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
