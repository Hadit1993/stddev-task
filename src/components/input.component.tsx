import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type InputProps = TextInputProps & {
  iconName: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const Input = (props: InputProps) => {
  return (
    <View style={[props.containerStyle, styles.container]}>
      <View
        style={[styles.inputContainer, !!props.error && styles.containerError]}>
        <TextInput {...props} style={[props.style, styles.input]} />
        <Icon
          name={props.iconName}
          color={props.error ? 'red' : 'gray'}
          size={24}
        />
      </View>
      {props.error && <Text style={styles.errorMessage}>{props.error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },

  inputContainer: {
    height: 45,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    height: '100%',
    flex: 1,
    marginRight: 10,
  },

  containerError: {
    borderColor: 'red',
  },
  errorMessage: {
    marginTop: 2,
    color: 'red',
    width: '100%',
    marginLeft: 15,
    fontSize: 11,
  },
});
