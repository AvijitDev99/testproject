import {View, Text} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import Navigator from './src/navigator/StackNavigator';
import DrawerNav from './src2/drawerNavigation/DrawerNav';
import TabMain from './src2/tabNavigation/TabMain';
import CalenderEx from './src2/calender/CalenderEx';
import SwitchEx from './src2/switch/SwitchEx';
import SliderBoxEx from './src2/sliderBox/SliderBoxEx';
import SliderEX from './src2/slider/SliderEX';
import CustomDrawerNav from './src2/customDrawerNavigation/CustomDrawerNav';
import CustomBottomTab from './src2/customTabNavigation/CustomBottomTab';
import Test from './src2/javascript/Test';
import TestCount from './src/TestCount';
import BottomTab from './src3/BottomTab';
import SignUp from './src2/validation/SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src2/validation/Login';
import Home from './src2/validation/Home';

const App = () => {
  const Stack = createStackNavigator();

  const ValidNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, gestureEnabled: false}}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return (
    // <Navigator/>
    // <DrawerNav/>
    // <CustomDrawerNav/>
    // <CustomBottomTab/>
    // <TabMain/>
    // <CalenderEx/>
    // <SwitchEx/>
    // <SliderBoxEx/>
    // <SliderEX/>
    // <TestCount/>
    // <BottomTab/>
    <ValidNavigator/>
  );
};

export default App;
