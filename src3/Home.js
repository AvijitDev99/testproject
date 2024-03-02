import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Home = () => {
  const [photos, setPhotos] = useState([]);

  async function getPhotos() {
    const res = await axios.get(
      'https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    if (res?.data?.photos) {
      setPhotos(res?.data?.photos);
    }
  }

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <FlatList
        data={photos}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 80
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor: 'red',
                width: '45%',
                height: 155,
                margin: 5,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.url}}
                style={{
                  resizeMode: 'cover',
                  flex: 1,
                }}
              />
            </View>
          );
        }}
        columnWrapperStyle={{
          justifyContent: 'center',
          width: '100%',
        }}
      />
    </View>
  );
};

export default Home;
