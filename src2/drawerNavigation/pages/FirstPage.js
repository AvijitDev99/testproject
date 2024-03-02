import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';

const FirstPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            onPress={() => navigation.navigate('Chat')}
            title="Go to Chat Page"
          />
          <Button
            onPress={() => navigation.navigate('ThirdPage')}
            title="Go to Third Page"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FirstPage;
