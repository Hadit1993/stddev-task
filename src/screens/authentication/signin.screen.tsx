import {Keyboard, StyleSheet, Text, View} from 'react-native';

import React, {useState} from 'react';
import Appbar from '../../components/appbar.component';
import Input from '../../components/input.component';
import Button from '../../components/button.component';
import {useNavigation} from '@react-navigation/native';
import NavigationRoutes from '../../utils/navigation/navigation.routes';
import {validateEmail, validatePassword} from '../../utils/validations';

interface SigninError {
  email?: string;
  password?: string;
}

const SignInScreen = () => {
  const navigation = useNavigation<any>();
  const [error, setError] = useState<SigninError>({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Appbar title="LOGIN" />
      <View style={styles.formContainer}>
        <Input
          onChangeText={value => setEmail(value)}
          placeholder="Email"
          iconName="mail-outline"
          error={error.email}
          returnKeyType="next"
          enablesReturnKeyAutomatically
        />
        <Input
          onChangeText={value => setPassword(value)}
          placeholder="Password"
          iconName="lock-outline"
          secureTextEntry
          error={error.password}
        />
        <Button
          label="Login"
          onPress={() => {
            const emailError = validateEmail(email);
            const passwordError = validatePassword(password);
            setError({
              email: emailError,
              password: passwordError,
            });

            if (!emailError && !passwordError) {
              Keyboard.dismiss();
            }
          }}
        />
        <Text style={styles.caption}>
          Don't you have an account?{' '}
          <Text
            onPress={() => {
              navigation.navigate(NavigationRoutes.auth.signup);
            }}
            style={styles.highlightedCaption}>
            Signup
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  caption: {
    color: 'black',
  },
  highlightedCaption: {
    color: '#526CFF',
    fontWeight: '700',
  },
});
