import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import DefaultTheme from '../utils/theme/default.theme';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={DefaultTheme.primaryColor} size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
