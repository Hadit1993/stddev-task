import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import DefaultTheme from '../utils/theme/default.theme';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Button = (props: ButtonProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity disabled={props.isLoading} onPress={props.onPress}>
        <View style={styles.labelContainer}>
          {props.isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {width: '100%', marginVertical: 15, height: 45},
  label: {
    color: 'white',

    fontWeight: 'bold',
    fontSize: 16,
  },
  labelContainer: {
    backgroundColor: DefaultTheme.primaryColor,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
