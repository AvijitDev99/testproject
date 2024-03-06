import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Input from './component/Input';
import {
  checkUserDetails,
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from './utils/validation';
import {useDispatch, useSelector} from 'react-redux';
import {addNewUser, loginSuccess} from '../../src/redux/reducer/AuthReducer';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const Login = ({navigation}) => {
  const isFocus = useIsFocused();

  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    cPassword: '',
  });

  const [error, setError] = useState([]);

  function updateState(field, value) {
    setUserInfo(pre => ({
      ...pre,
      [field]: value,
    }));
  }

  const updateError = (field, err) => {
    if (err !== '') {
      const itemIndex = error.findIndex(item => item.field === field);
      if (itemIndex === -1) {
        error.push({
          field: field,
          error: err,
        });
        return;
      }

      const updatedItems = error.map((item, index) =>
        index === itemIndex ? {...item, error: err} : item,
      );

      setError(updatedItems);
    } else {
      removeError(field);
    }
  };

  const removeError = field => {
    const _index = error.findIndex(item => item?.field === field);
    if (_index !== -1) {
      const updatedItems = [
        ...error.slice(0, _index),
        ...error.slice(_index + 1),
      ];
      setError(updatedItems);
    }
  };

  function loginUser(userInfo) {
    let users = AuthReducer?.users;

    let isExits = users.filter(
      item => item.email == userInfo.email?.toLowerCase(),
    );

    // console.log('isExits -- ',isExits);

    if (isExits.length > 0) {
      if (isExits[0]?.password == userInfo.password) {
        // login Successfully
        console.log('login Successfully');
        dispatch(
          loginSuccess({
            data: isExits[0],
          }),
        );
        navigation.navigate('Home');
      } else {
        // password do not match
        console.log('password do not match');
      }
    }else{
      // user not found
      console.log('user not found');
    }
  }

  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('blur', () => {
  //       console.log('unsubscribe 11 -- blur');
  //     });

  //     const unsubscribe1 = navigation.addListener('focus', () => {
  //       console.log('unsubscribe 11 -- focus');
  //     });

  //     return () => {
  //       unsubscribe();
  //       unsubscribe1();
  //     };
  //   }, []);

//   console.log('isFocus -- ', isFocus);

  //   useFocusEffect(
  //     useCallback(() => {
  //       const unsubscribe = navigation.addListener('blur', () => {
  //         console.log('unsubscribe 22 -- blur');
  //       });

  //       const unsubscribe1 = navigation.addListener('focus', () => {
  //         console.log('unsubscribe 22 -- focus');

  //       });

  //       return () => {
  //         unsubscribe();
  //         unsubscribe1();
  //       };
  //     }, [navigation]),
  //   );

//   useEffect(() => {
//     if (isFocus) {
//       setUserInfo({
//         cPassword: '',
//         email: '',
//         password: '',
//       });
//       setError([]);
//     }
//   }, [isFocus]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: 150,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.title1}>Login</Text>

          <Input
            placeholder={'Email'}
            value={userInfo.email}
            onChangeText={v => updateState('email', v)}
            error={error}
            onChange={e => {
              updateError('email', validateEmail(e.nativeEvent.text));
            }}
          />

          <Input
            placeholder={'Password'}
            value={userInfo.password}
            onChangeText={v => updateState('password', v)}
            error={error}
            onChange={e => {
              updateError('password', validatePassword(e.nativeEvent.text));
            }}
          />
          <Input
            placeholder={'Confirm Password'}
            value={userInfo.cPassword}
            onChangeText={v => updateState('cPassword', v)}
            error={error}
            onChange={e => {
              updateError(
                'confirm password',
                validateConfirmPassword(userInfo.password, e.nativeEvent.text),
              );
            }}
          />

          <TouchableOpacity
            disabled={error.length > 0}
            style={[
              styles.btn,
              {
                backgroundColor: error.length > 0 ? '#dfdfdf' : '#03BEBE',
              },
            ]}
            onPress={() => {
              var err = checkUserDetails(userInfo);
              if (err.length > 0) {
                setError(err);
              } else {
                loginUser(userInfo);
              }
            }}>
            <Text style={styles.title}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.txt}>
            Don't have account?
            {
              <Text
                onPress={() => navigation.navigate('SignUp')}
                style={styles.txt2}>
                {' '}
                Sign up
              </Text>
            }
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: '90%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 45,
  },
  title1: {
    fontSize: 24,
    color: '#03BEBE',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 18,
    marginBottom: 100,
  },
  title2: {
    fontSize: 18,
    color: 'grey',
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginLeft: 18,
    marginBottom: 80,
  },
  title: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  txt: {
    fontSize: 16,
    color: 'black',
  },
  txt2: {
    color: '#03BEBE',
    fontWeight: '500',
  },
});
