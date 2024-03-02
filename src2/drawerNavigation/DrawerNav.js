import 'react-native-gesture-handler';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';
import Chat from './pages/Chat';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={FirstPage} />
      <Stack.Screen name="Chat" component={Chat} />
      {/* <Stack.Screen name="Chat" component={Chat} /> */}
      {/* <Stack.Screen name="ThirdPage" component={ThirdPage} /> */}
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={SecondPage} />
      <Stack.Screen name="ThirdPage" component={ThirdPage} />
      
    </Stack.Navigator>
  );
};

function DrawerNav() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#fff', //Set Drawer background
            width: 250, //Set Drawer width
          },
          headerStyle: {
            backgroundColor: 'green', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          headerShown: true,
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            title: 'Dashboard',
          }}
          component={HomeStack}
        />
        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }}
          component={ProfileStack}
        />

        <Drawer.Screen
          name="ThirdPage"
          options={{
            drawerLabel: 'Notifications',
            title: 'Notifications',
          }}
          component={ThirdPage}
        />

        {/* <Drawer.Screen
          name="Chat"
          options={{
            drawerLabel: 'Chat',
            title: 'Chat',
          }}
          component={Chat}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNav;
