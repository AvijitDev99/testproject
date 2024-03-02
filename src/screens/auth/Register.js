import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/Input';
import isInternetConnected from '../../utils/NetInfo';
import showErrorAlert from '../../utils/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest, signupRequest} from '../../redux/reducer/AuthReducer';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  // console.log('signupRes -- >>> ', AuthReducer?.signupRes);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submit() {
    if (name !== '' && email !== '' && password !== '') {
      let obj = {
        name: name,
        email: email,
        password: password,
      };

      isInternetConnected()
        .then(() => {
          dispatch(signupRequest(obj));
        })
        .catch(err => {
          console.log('err -- ', err);
          showErrorAlert('Please Connect To Internet');
        });
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/14613/14613256.png',
        }}
        style={styles.logo}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        style={styles.btnBcak}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/130/130882.png',
          }}
          style={styles.back}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>

      <Input
        icon={'https://cdn-icons-png.flaticon.com/128/747/747376.png'}
        placeholder={'Name'}
        value={name}
        onChangeText={setName}
      />

      <Input
        icon={'https://cdn-icons-png.flaticon.com/128/646/646094.png'}
        placeholder={'Email'}
        value={email}
        onChangeText={setEmail}
      />

      <Input
        icon={'https://cdn-icons-png.flaticon.com/128/2889/2889676.png'}
        placeholder={'Password'}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={() => submit()}
        activeOpacity={0.7}
        style={styles.touch}>
        <Text style={styles.btnTitle}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.txt}>
        Already have a account?{' '}
        {
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.txt2}>
            Sign in
          </Text>
        }
      </Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 65,
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: 'black',
    marginBottom: 40,
  },
  touch: {
    backgroundColor: 'black',
    height: 52,
    borderRadius: 30,
    paddingHorizontal: 50,
    alignSelf: 'flex-end',
    marginVertical: 20,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 8,
    shadowOpacity: 1,
    shadowRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  txt: {
    fontSize: 16,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    color: 'grey',
  },
  txt2: {color: 'black', fontWeight: '500'},
  btnBcak: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 65,
    left: 5,
  },
  back: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
});
