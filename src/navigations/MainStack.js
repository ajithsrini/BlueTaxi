import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Stack = createStackNavigator()

function MainStack (){
    return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="AuthStack" >
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="AppStack" component={AppStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack