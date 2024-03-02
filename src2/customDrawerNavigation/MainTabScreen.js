import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';
import {Image, TouchableOpacity} from 'react-native';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="green"
    inactiveColor="grey">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, focused}) => (
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png',
            }}
            style={{
              height: 22,
              width: 22,
              tintColor: focused ? 'green' : 'grey',
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Notifications',
        tabBarIcon: ({color, focused}) => (
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3239/3239952.png',
            }}
            style={{
              height: 22,
              width: 22,
              tintColor: focused ? 'green' : 'grey',
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, focused}) => (
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/456/456283.png',
            }}
            style={{
              height: 22,
              width: 22,
              tintColor: focused ? 'green' : 'grey',
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({color, focused}) => (
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/77/77521.png',
            }}
            style={{
              height: 22,
              width: 22,
              tintColor: focused ? 'green' : 'grey',
            }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home',
        headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 15,
            }}
            onPress={() => navigation.openDrawer()}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/9091/9091429.png',
              }}
              style={{
                height: 22,
                width: 22,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 15,
            }}
            onPress={() => navigation.openDrawer()}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/9091/9091429.png',
              }}
              style={{
                height: 22,
                width: 22,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </DetailsStack.Navigator>
);