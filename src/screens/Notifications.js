import { View, Text } from 'react-native'
import React from 'react'

const Notifications = ({navigation,route}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        onPress={() =>
          navigation.goBack()
        }>
        {route.params.item?.name + ' '} 
        {route.params.item?.location +' '}
        {route.params.item?.pin}
      </Text>
    </View>
  )
}

export default Notifications