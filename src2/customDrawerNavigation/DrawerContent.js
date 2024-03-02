import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

export function DrawerContent(props) {
  const screens = props?.state?.routeNames;

  function CustomDrawerItem({icon, title, page}) {
    const focused = page == screens[props?.state?.index];

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate(`${page}`)}
        style={{
          height: 45,
          marginTop: 10,
          borderRadius: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: focused
            ? 'rgba(0, 255, 145, 0.1)'
            : 'rgba(0,0,0,0.05)',
        }}>
        <Image
          source={{
            uri: icon,
          }}
          style={{
            height: 22,
            width: 22,
          }}
        />
        <Text
          style={{
            fontSize: focused ? 18 : 16,
            fontWeight: focused ? '600' : '400',
            marginLeft: 15,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View>
            <View style={styles.userInfoSection}>
              <Image
                source={{
                  uri: 'https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg',
                }}
                style={{
                  height: 55,
                  width: 55,
                  borderRadius: 60,
                }}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Text style={styles.title}>Avijit Bhowmik</Text>
                <Text style={styles.caption}>Developer</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.paragraph, styles.caption]}>80</Text>
                <Text style={styles.caption}>Following</Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.paragraph, styles.caption]}>100</Text>
                <Text style={styles.caption}>Followers</Text>
              </View>
            </View>
          </View>

          <CustomDrawerItem
            icon={'https://cdn-icons-png.flaticon.com/128/1946/1946488.png'}
            page={'HomeDrawer'}
            title={'Home'}
          />

          <CustomDrawerItem
            icon={'https://cdn-icons-png.flaticon.com/128/9370/9370123.png'}
            page={'SavedScreen'}
            title={'Saved'}
          />

          <CustomDrawerItem
            icon={'https://cdn-icons-png.flaticon.com/128/2099/2099058.png'}
            title={'Settings'}
            page={'Settings'}
          />

          <CustomDrawerItem
            icon={'https://cdn-icons-png.flaticon.com/128/839/839961.png'}
            title={'Support'}
            page={'SupportScreen'}
          />

          {/* <DrawerItem
            icon={({color, size}) => (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png',
                }}
                style={{
                  height: 22,
                  width: 22,
                }}
              />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
            style={{
              // backgroundColor: 'red',
              marginTop: 8,
            }}
          /> */}

          {/* <DrawerItem
            icon={({color, size}) => (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/456/456283.png',
                }}
                style={{
                  height: 22,
                  width: 22,
                }}
              />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
            style={
              {
                // backgroundColor: 'red',
              }
            }
          /> */}

          {/* <DrawerItem
            icon={({color, size}) => (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/2099/2099058.png',
                }}
                style={{
                  height: 22,
                  width: 22,
                }}
              />
            )}
            label="Settings"
            onPress={() => {
              props.navigation.navigate('SettingsScreen');
            }}
            style={
              {
                // backgroundColor: 'red',
              }
            }
          /> */}

          {/* <DrawerItem
            icon={({color, size}) => (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/839/839961.png',
                }}
                style={{
                  height: 22,
                  width: 22,
                }}
              />
            )}
            label="Support"
            onPress={() => {
              props.navigation.navigate('SupportScreen');
            }}
            style={
              {
                // backgroundColor: 'red',
              }
            }
          /> */}
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    color: 'grey',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    paddingBottom: 1,
    height: 40,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '49.9%',
    justifyContent: 'center',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
