import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import WisdomRespondingContentView from "@/components/WisdomRespondingContentView"
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { MyStyle } from '@/constants/Styles';

const WisdomRespondStandalone = () => {
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [isShareEnabled, toggleShareEnabled] = useState(false);
  const [responseText, onChangeResponseText] = useState('');

  return <SafeAreaView style={MyStyle.screen} edges={['bottom']}>
    <Header showBack={true}/>

    <View style={MyStyle.wisdomContainer}>
      <Text style={MyStyle.wisdomContent}>
        !!! Đây là cái Quote ngoan xinh yêu của con nè !!!
        !!! Nó Sẽ luôn dock ở trên đầu trang này !!!
      </Text>
      <Text style={MyStyle.wisdomAuthor}>— Dè De</Text>
    </View>

    <ScrollView style={MyStyle.screenContainer}>
    
      <WisdomRespondingContentView
        isCompact={false}
        isTextInputFocused={isTextInputFocused}
        setIsTextInputFocused={setIsTextInputFocused}
        responseText={responseText}
        onChangeResponseText={onChangeResponseText}
        isShareEnabled={isShareEnabled}
        toggleShareEnabled={toggleShareEnabled}
      />
    </ScrollView>
  </SafeAreaView>
}

export default WisdomRespondStandalone;