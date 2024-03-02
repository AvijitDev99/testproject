import {View, Text, Image, TextInput} from 'react-native';
import React from 'react';

const Input = ({placeholder, value, icon, onChangeText,secureTextEntry}) => {
  return (
    <View
      style={{
        height: 52,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        elevation: 8,
        shadowOpacity: 1,
        shadowRadius: 8,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 15,
      }}>
      <Image
        source={{
          uri: icon,
        }}
        style={{
          height: 25,
          width: 25,
          tintColor: 'grey',
        }}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        style={{
          flex: 1,
          color: 'black',
          fontSize: 15,
          fontWeight: '400',
          paddingHorizontal: 10,
          height: '100%',
        }}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;
