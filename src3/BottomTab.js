import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import Chat from './Chat';
import Notifications from './Notifications';
import Settings from './Settings';
import {BlurView} from '@react-native-community/blur';

const BottomTab = () => {
  const BottomStack = createBottomTabNavigator();

  const TABS = [
    {
      title: 'Home',
      component: Home,
      icon: 'https://cdn-icons-png.flaticon.com/128/2549/2549900.png',
    },
    {
      title: 'Chat',
      component: Chat,
      icon: 'https://cdn-icons-png.flaticon.com/128/11478/11478257.png',
    },
    {
      title: 'Notification',
      component: Notifications,
      icon: 'https://cdn-icons-png.flaticon.com/128/2985/2985052.png',
    },
    {
      title: 'Settings',
      component: Settings,
      icon: 'https://cdn-icons-png.flaticon.com/128/2956/2956788.png',
    },
  ];

  function tabBarLabel({focused}) {
    return (
      <View
        style={{
          height: 5,
          width: 5,
          backgroundColor: 'green',
          borderRadius: 5,
          opacity: focused ? 1 : 0,
        }}
      />
    );
  }

  function tabBarBackground() {
    return (
      <BlurView
        blurType="regular"
        blurAmount={55}
        style={{
          ...StyleSheet.absoluteFillObject,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          backgroundColor: 'transparent',
          overflow: 'hidden',
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <BottomStack.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            shadowColor: 'rgba(47,64,85,1)',
            shadowRadius: 12,
            shadowOffset: {
              height: 4,
              width: 0,
            },
            shadowOpacity: 0.12,
          },
          tabBarBackground: tabBarBackground,
        }}>
        {TABS.map((item, index) => (
          <BottomStack.Screen
            key={index}
            name={item.title}
            component={item.component}
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                  source={{uri: item.icon}}
                  style={{
                    resizeMode: 'contain',
                    height: 24,
                    width: 24,
                    tintColor: focused ? 'green' : undefined,
                  }}
                />
              ),
              tabBarLabel,
              tabBarLabelPosition: 'below-icon',
            }}
          />
        ))}
      </BottomStack.Navigator>
    </NavigationContainer>
  );
};

export default BottomTab;
