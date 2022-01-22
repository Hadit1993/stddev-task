import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AppBarProps {
  title: string;
  backEnabled?: boolean;
}

const Appbar = (props: AppBarProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.appbarContainer}>
      {props.backEnabled && (
        <Icon
          onPress={navigation.goBack}
          style={styles.icon}
          name="arrow-back"
          size={30}
          color="black"
        />
      )}
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  appbarContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  icon: {position: 'absolute', left: 16},
});
