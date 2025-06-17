import Modal from 'react-native-modal';

function CustomModel ({children,modelVisible,setModelVisible,justifyContent = "flex-start",hasBackdrop=false}){
    const toggleModal = () => {
        setModelVisible(!modelVisible);
    }
    return(
        <Modal
        isVisible={modelVisible}
        onBackdropPress={toggleModal}
        hasBackdrop={hasBackdrop}
        backdropOpacity={0.5}
        animationInTiming={300}
        animationOutTiming={300}
        onBackButtonPress={toggleModal}
        backdropColor='black'
        style={{justifyContent:justifyContent,margin:0}}
        onSwipeComplete={() => setModelVisible(false)}
        swipeDirection={"down"}
        >
        {children}
        </Modal>
    )

}

export default CustomModel