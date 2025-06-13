import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import LocationProvider from "../context/LocationContext";

const Stack = createStackNavigator()

function MainStack (){
    return(
        <LocationProvider>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="AppStack" >
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="AppStack" component={AppStack} />
            </Stack.Navigator>
        </NavigationContainer>
        </LocationProvider>
    )
}

export default MainStack