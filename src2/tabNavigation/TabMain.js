import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Videos from './pages/Videos';
import Photos from './pages/Photos';
import PhotosView from './pages/PhotosView';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function PhotosStack() {
  return (
    <Stack.Navigator
      initialRouteName="Photos"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Photos" component={Photos} />
      <Stack.Screen name="PhotosView" component={PhotosView} />
    </Stack.Navigator>
  );
}

function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#F8F8F8',
        tabBarStyle: {
          backgroundColor: 'green',
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIndicatorStyle: {
          borderBottomColor: 'black',
          borderBottomWidth: 3,
        },
      }}>
      <Tab.Screen
        name="Photos"
        component={PhotosStack}
        options={{
          tabBarLabel: 'Photos',
        }}
      />
      <Tab.Screen
        name="Videos"
        component={Videos}
        options={{
          tabBarLabel: 'Videos',
        }}
      />
    </Tab.Navigator>
  );
}

function TabMain() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: 'green'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{title: 'Dashboard'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default TabMain;
