import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/14613/14613256.png',
        }}
        style={{
          resizeMode: 'contain',
          height: 150,
          width: 150,
        }}
      />
    </View>
  );
};

export default Splash;
