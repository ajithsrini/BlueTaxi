import { View } from "react-native"
import { Bars3Icon } from "react-native-heroicons/outline"
import { SafeAreaView } from "react-native-safe-area-context"

function InviteFriends({navigation}){
    return(
       <SafeAreaView>
        <Bars3Icon onPress={()=>navigation.openDrawer()} />
       </SafeAreaView>
    )

}
export default InviteFriends