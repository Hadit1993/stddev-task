import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.label}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {width: '100%', marginVertical: 15},
  label: {
    backgroundColor: '#526CFF',
    width: '100%',
    height: 45,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
