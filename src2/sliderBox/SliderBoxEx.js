import {View, Text} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';

const SliderBoxEx = () => {
  const DATA = [
    'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/9463153/pexels-photo-9463153.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
     <View style={{
        height: 200
     }}>
     <SliderBox
        images={DATA}
        sliderBoxHeight={200}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor="green"
        inactiveDotColor="#90A4AE"
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 12,
          marginHorizontal: 5,
          padding: 0,
          margin: 0,
        }}
      />
     </View>
    </View>
  );
};

export default SliderBoxEx;
