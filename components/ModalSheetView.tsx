import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { PropsWithChildren } from 'react';

import { Colors } from '@/constants/Colors';


type ModalSheetViewProps = PropsWithChildren<{
  isVisible: boolean
  requestClose: () => void
  title: string | null
}>

const ModalSheetView: React.FC<ModalSheetViewProps> = props => {
  return (

    <Modal
      animationType="fade"
      transparent={true}
      // backdropColor={#10101010}
      visible={props.isVisible}
      onRequestClose={() => { props.requestClose }}>
      <TouchableWithoutFeedback onPressOut={props.requestClose}>
        <View style={styles.centeredView}>
          {/* Wrap a layer of touch consuming view so pressing on Modal wont close*/}
          <TouchableWithoutFeedback >
            <View style={styles.modalView}>
              {props.title != null &&
                <Text style={styles.modalTitle}>
                  {props.title}
                </Text>
              }
              {props.children}
            </View>

          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10101090'
  },
  modalView: {
    width: '80%',
    minHeight: '20%',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textTitle, 
    marginBottom: 8
  }
})

export default ModalSheetView;