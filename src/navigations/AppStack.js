import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import DropLocationSelector from '../screens/homeScreen/DropLocationSelector';
import {TransitionPresets} from '@react-navigation/stack';
import RideDetails from '../screens/homeScreen/RideDetails';

const Stack = createStackNavigator();
function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="DropLocationSelector"
        component={DropLocationSelector}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS
        }}
      />
      <Stack.Screen name='RideDetails' component={RideDetails}/>
    </Stack.Navigator>
  );
}

export default AppStack;
