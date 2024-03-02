import { View, Text } from 'react-native'
import React from 'react'
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

const App = () => {
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
    // <BottomBar/>
    <BottomTab/>
  )
}

export default App
