import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

function CustomModel ({children,modelVisible,setModelVisible}){
    const toggleModal = () => {
        setModelVisible(!modelVisible);
    }
    return(
        <Modal
        isVisible={modelVisible}
        onBackdropPress={toggleModal}
        hasBackdrop={false}
        animationInTiming={300}
        animationOutTiming={300}
        onBackButtonPress={toggleModal}
        backdropColor='white'
        style={style.modelStyle}
        onSwipeComplete={() => setModelVisible(false)}
        swipeDirection={"down"}
        >
        {children}
        </Modal>
    )

}

export default CustomModel
const style = StyleSheet.create({
    modelStyle:{
        justifyContent:"flex-start",
        margin:0
    }
})