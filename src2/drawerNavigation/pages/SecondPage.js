// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';

const SecondPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title="Go to Home Page"
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          title="Go to Third Page"
          onPress={() => navigation.navigate('ThirdPage')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SecondPage;
