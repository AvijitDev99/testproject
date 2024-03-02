import { View, Text } from 'react-native'
import React from 'react'

const Chat = ({navigation}) => {
  return (
    <View style={{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }}>
      <Text>Chat</Text>
      <Text onPress={() => navigation.goBack()}>back</Text>
    </View>
  )
}

export default Chat