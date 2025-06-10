
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/splash/Splash";
import Onboard from "../screens/onboard/Onboard";
import LocationGetter from "../screens/onboard/LocationGetter";
import Authentication from "../screens/login/Authentication";
import OtpVerify from "../screens/login/OtpVerify";

const Stack = createStackNavigator()
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Onboard" component={Onboard} />
            <Stack.Screen name="LocationGetter" component={LocationGetter} />
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="OtpVerify" component={OtpVerify} />
        </Stack.Navigator>
    );
}

export default AuthStack