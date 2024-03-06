import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
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
import {addNewUser} from '../../src/redux/reducer/AuthReducer';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    cPassword: '',
  });

  const [error, setError] = useState([]);

  console.log('AuthReducer?.users -- ',AuthReducer?.users);

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

  function registerUser(userInfo) {
    let users = AuthReducer?.users;

    let obj = {...userInfo};
    obj.id = users.length + 1;
    obj.email = userInfo.email?.toLowerCase();

    let isExits = users.filter(item => item.email == obj.email).length;

    if (isExits == 0) {
      dispatch(addNewUser(obj));
      console.log('Register Successfully');
    } else {
      console.log('Email already exists. Please choose a different email id');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: 85,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.title1}>Register</Text>
          <Text style={styles.title2}>Please enter details to register</Text>
          <Input
            placeholder={'Name'}
            value={userInfo.name}
            onChangeText={v => updateState('name', v)}
            error={error}
            onChange={e => {
              updateError('name', validateName(e.nativeEvent.text));
            }}
          />
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
            placeholder={'Mobile Number'}
            value={userInfo.number}
            onChangeText={v => updateState('number', v)}
            keyboardType={'numeric'}
            error={error}
            onChange={e => {
              updateError(
                'mobile number',
                validatePhoneNumber(e.nativeEvent.text),
              );
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
                registerUser(userInfo);
              }
            }}>
            <Text style={styles.title}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.txt}>
            Already have an account?
            {
              <Text
                onPress={() => navigation.navigate('Login')}
                style={styles.txt2}>
                {' '}
                Login
              </Text>
            }
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
