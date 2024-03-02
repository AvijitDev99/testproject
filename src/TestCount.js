import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeNumber, InNumber } from './redux/reducer/CounterReducer';

const TestCount = () => {

  const dispatch = useDispatch();
  const CounterReducer = useSelector(state => state.CounterReducer);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 15
    }}>
      
      <TouchableOpacity 
      onPress={() => dispatch(InNumber(5))}
      style={{
        backgroundColor: 'black',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 20
      }}>
        <Text style={{
          fontSize: 20,
          color: 'white'
        }}>+</Text>
      </TouchableOpacity>
      <Text style={{
        alignSelf: 'center'
      }}>{CounterReducer.count}</Text>
      <TouchableOpacity 
      onPress={() => dispatch(DeNumber(5))}
      style={{
        backgroundColor: 'black',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 20
      }}>
        <Text style={{
          fontSize: 20,
          color: 'white'
        }}>-</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TestCount