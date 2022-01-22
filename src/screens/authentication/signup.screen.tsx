import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Appbar from '../../components/appbar.component';
import Input from '../../components/input.component';
import Button from '../../components/button.component';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Appbar title="SIGNUP" backEnabled />
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Input
            // onChangeText={value => setEmail(value)}
            placeholder="First Name"
            iconName="person-outline"
            // error={error.email}
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
          <Input
            // onChangeText={value => setEmail(value)}
            placeholder="Last Name"
            iconName="person-outline"
            // error={error.email}
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
          <Input
            // onChangeText={value => setEmail(value)}
            placeholder="Email"
            iconName="mail-outline"
            // error={error.email}
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
          <Input
            // onChangeText={value => setPassword(value)}
            placeholder="Password"
            iconName="lock-outline"
            secureTextEntry
            // error={error.password}
          />
          <Input
            // onChangeText={value => setPassword(value)}
            placeholder="Confirm Password"
            iconName="lock-outline"
            secureTextEntry
            // error={error.password}
          />

          <Button
            label="Sign Up"
            onPress={() => {
              // const emailError = validateEmail(email);
              // const passwordError = validatePassword(password);
              // setError({
              //   email: emailError,
              //   password: passwordError,
              // });
              // if (!emailError && !passwordError) {
              //   Keyboard.dismiss();
              // }
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
