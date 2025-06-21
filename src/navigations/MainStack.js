import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LocationProvider from '../context/LocationContext';
import Store from '../store/Store';
import DrawerNavigator from './Drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/settings/Profile';

const Stack = createStackNavigator();


function MainStack() {
  return (
    <Provider store={Store}>
      <LocationProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="Drawer">
              <Stack.Screen name="AuthStack" component={AuthStack} />
              <Stack.Screen name="Drawer" component={DrawerNavigator} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
           
          </NavigationContainer>
      </LocationProvider>
    </Provider>
  );
}

export default MainStack;
