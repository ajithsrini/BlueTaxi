import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LocationProvider from '../context/LocationContext';
import Store from '../store/Store';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Provider store={Store}>
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="AuthStack">
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
    </Provider>
  );
}

export default MainStack;
