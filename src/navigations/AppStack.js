
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/homeScreen/HomeScreen";


const Stack = createStackNavigator()
function AppStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default AppStack