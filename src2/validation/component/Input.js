import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';

const Input = ({
  placeholder,
  value = '',
  onChangeText,
  keyboardType = 'default',
  error,
  onChange,
}) => {
  const [isFocus, setFocus] = useState(false);

  var arr = error?.filter(
    item => item.field == String(placeholder).toLowerCase(),
  );

  return (
    <View
      style={{
        width: '90%',
        marginBottom: 10,
        marginTop: 15,
      }}>
      {value !== '' && (
        <Text
          style={{
            fontSize: 12,
            color: 'grey',
            position: 'absolute',
            top: -15,
          }}>
          {placeholder}
        </Text>
      )}
      <TextInput
        style={{
          //   flex: 1,
          color: 'black',
          height: 40,
          width: '100%',
          borderColor: arr.length > 0 ? 'red' : isFocus ? 'green' : '#dcdcdc',
          borderBottomWidth: 1,
        }}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={'#dcdcdc'}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={onChange}
      />
      {arr.length > 0 && (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            textAlign: 'right',
          }}>
          {arr[0]?.error}
        </Text>
      )}
    </View>
  );
};

export default Input;
