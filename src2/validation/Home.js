import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  console.log('AuthReducer -- ', AuthReducer.loginRes);
  console.log('Token -- ', AuthReducer.token);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
