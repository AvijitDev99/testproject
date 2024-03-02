// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/

import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';

const ThirdPage = ({route, navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Go to Home Page"
        />
        <Button
          onPress={() => navigation.navigate('Profile')}
          title="Go to Profile Page"
        />
      </View>
    </SafeAreaView>
  );
};

export default ThirdPage;
