import {Keyboard, StyleSheet, Text, View} from 'react-native';

import React, {useEffect} from 'react';
import Appbar from '../../components/appbar.component';
import Input from '../../components/input.component';
import Button from '../../components/button.component';
import {CommonActions, useNavigation} from '@react-navigation/native';
import NavigationRoutes from '../../utils/navigation/navigation.routes';
import {validateEmail, validatePassword} from '../../utils/validations';
import useGlobalState from '../../utils/hooks/useGlobalState';
import useAuthActions from '../../store/actions/actionCreators/auth.action-creator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_KEY} from '../../utils/constants';

const SignInScreen = () => {
  const navigation = useNavigation<any>();

  const {
    authenticatedUser,
    signIn: {errors, isSubmitting, values},
  } = useGlobalState(state => state.auth);

  const {updateSigninError, updateSigninValue, signin} = useAuthActions();

  useEffect(() => {
    if (authenticatedUser) {
      AsyncStorage.setItem(AUTH_KEY, authenticatedUser.id.toString());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: NavigationRoutes.main.name,
            },
          ],
        }),
      );
    }
  }, [authenticatedUser, navigation]);

  return (
    <View style={styles.container}>
      <Appbar title="LOGIN" />
      <View style={styles.formContainer}>
        <Input
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={value => updateSigninValue({email: value})}
          placeholder="Email"
          iconName="mail-outline"
          error={errors.email}
          returnKeyType="next"
        />
        <Input
          onChangeText={value => updateSigninValue({password: value})}
          placeholder="Password"
          iconName="lock-outline"
          secureTextEntry
          error={errors.password}
        />

        {!!errors.submit && (
          <Text style={styles.submitError}>{errors.submit}</Text>
        )}
        <Button
          label="Login"
          isLoading={isSubmitting}
          onPress={() => {
            const emailError = validateEmail(values.email);
            const passwordError = validatePassword(values.password);

            updateSigninError({email: emailError, password: passwordError});

            if (!emailError && !passwordError) {
              Keyboard.dismiss();
              signin();
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
  submitError: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
