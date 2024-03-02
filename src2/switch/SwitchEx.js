import {Text, View} from 'react-native';
import React, {Component, useState} from 'react';
import {Switch} from 'react-native-switch';

export default function SwitchEx() {
  const [isVisible, setIsVisivile] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Switch
        value={isVisible}
        onValueChange={val => {
          setIsVisivile(val);
        }}
        circleSize={30}
        barHeight={35}
        circleBorderWidth={2}
        circleBorderActiveColor={'green'}
        circleBorderInactiveColor={'white'}
        backgroundActive={'green'}
        backgroundInactive={'white'}
        circleActiveColor={'#fff'}
        circleInActiveColor={'#505050'}
        containerStyle={{
          borderWidth: isVisible == false ? 2 : 0,
          borderColor: '#505050',
          paddingVertical: 0,
          width: 2,
        }}
        changeValueImmediately={true}
        innerCircleStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 2,
        }}
        renderActiveText={false}
        renderInActiveText={false}
        switchWidthMultiplier={2.2}
        switchBorderRadius={28}
      />
    </View>
  );
}
