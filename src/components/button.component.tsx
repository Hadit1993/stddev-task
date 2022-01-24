import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

interface ButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={props.isLoading} onPress={props.onPress}>
        <View style={styles.labelContainer}>
          {props.isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.label}>{props.label}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {width: '100%', marginVertical: 15},
  label: {
    color: 'white',

    fontWeight: 'bold',
    fontSize: 16,
  },
  labelContainer: {
    backgroundColor: '#526CFF',
    width: '100%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
