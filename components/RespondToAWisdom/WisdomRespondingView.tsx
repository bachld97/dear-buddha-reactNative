import React, { useState } from 'react';
import { Keyboard } from 'react-native';

import ModalSheetView from '@/components/ModalSheetView';
import WisdomRespondingContentView from '@/components/RespondToAWisdom/WisdomRespondingContentView';

type WisdomRespondingProps = {
  isVisible: boolean
  requestClose: () => void
}

const WisdomRespondingView: React.FC<WisdomRespondingProps> = props => {
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [isShareEnabled, toggleShareEnabled] = useState(false);
  const [responseText, onChangeResponseText] = useState('');

  return (
    <ModalSheetView 
      isVisible={props.isVisible}
      requestClose={() => {

        if (isTextInputFocused) {
          setIsTextInputFocused(false)
          Keyboard.dismiss()
        } else {
          props.requestClose()
        }

      }}
      title={"Phản hồi"}
    >

      <WisdomRespondingContentView
        isCompact={true}
        isTextInputFocused={isTextInputFocused}
        setIsTextInputFocused={setIsTextInputFocused}
        responseText={responseText}
        onChangeResponseText={onChangeResponseText}
        isShareEnabled={isShareEnabled}
        toggleShareEnabled={toggleShareEnabled}
      />

    </ModalSheetView>
    
  )
}

export default WisdomRespondingView;