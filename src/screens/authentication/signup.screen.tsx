import {Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Appbar from '../../components/appbar.component';
import Input from '../../components/input.component';
import Button from '../../components/button.component';
import useGlobalState from '../../utils/hooks/useGlobalState';
import useAuthActions from '../../store/actions/actionCreators/auth.action-creator';
import {
  validateConfirmPassword,
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
} from '../../utils/validations';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const {errors, values, isSubmitting} = useGlobalState(
    state => state.auth.signUp,
  );

  const navigation = useNavigation();

  const {updateSignupError, updateSignupValue, signup} = useAuthActions();

  return (
    <View style={styles.container}>
      <Appbar title="SIGNUP" backEnabled />
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.formContainer}>
          <Input
            onChangeText={firstName => updateSignupValue({firstName})}
            placeholder="First Name"
            iconName="person-outline"
            error={errors.firstName}
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
          <Input
            onChangeText={lastName => updateSignupValue({lastName})}
            placeholder="Last Name"
            iconName="person-outline"
            error={errors.lastName}
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
          <Input
            onChangeText={email => updateSignupValue({email})}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email"
            iconName="mail-outline"
            error={errors.email}
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
          <Input
            onChangeText={password => updateSignupValue({password})}
            placeholder="Password"
            iconName="lock-outline"
            secureTextEntry
            error={errors.password}
          />
          <Input
            onChangeText={confirmPassword =>
              updateSignupValue({confirmPassword})
            }
            placeholder="Confirm Password"
            iconName="lock-outline"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            label="Sign Up"
            isLoading={isSubmitting}
            onPress={async () => {
              const firstnameError = validateFirstname(values.firstName);
              const lastnameError = validateLastname(values.lastName);
              const emailError = validateEmail(values.email);
              const passwordError = validatePassword(values.password);
              const confirmPasswordError = validateConfirmPassword(
                values.confirmPassword,
                values.password,
              );
              updateSignupError({
                firstName: firstnameError,
                lastName: lastnameError,
                email: emailError,
                password: passwordError,
                confirmPassword: confirmPasswordError,
              });
              if (
                !(
                  emailError ||
                  passwordError ||
                  firstnameError ||
                  lastnameError ||
                  confirmPasswordError
                )
              ) {
                Keyboard.dismiss();
                const isSuccessFull = await signup();
                if (isSuccessFull) {
                  navigation.goBack();
                }
              }
            }}
          />

          <Text style={styles.caption}>
            By signing up you accept the{' '}
            <Text onPress={() => {}} style={styles.highlightedCaption}>
              Terms of Service
            </Text>
            {'\n'}
            and{' '}
            <Text onPress={() => {}} style={styles.highlightedCaption}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },

  caption: {
    color: 'black',
    textAlign: 'center',
    lineHeight: 20,
  },
  highlightedCaption: {
    color: '#526CFF',
    fontWeight: '700',
  },
});
