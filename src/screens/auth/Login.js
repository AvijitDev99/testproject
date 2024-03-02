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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/14613/14613256.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subTitle}>Please sign in to continue.</Text>

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
        // secureTextEntry={true}
      />

      <TouchableOpacity
       activeOpacity={0.7} style={styles.touch}>
        <Text style={styles.btnTitle}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.txt}>
        Don't have an account?{' '}
        {
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.txt2}>
            Sign up
          </Text>
        }
      </Text>
    </View>
  );
};

export default Login;

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
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: 'grey',
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
});
