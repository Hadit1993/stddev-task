import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import DefaultTheme from '../../utils/theme/default.theme';

import useAuthActions from '../../store/actions/actionCreators/auth.action-creator';
import useGlobalState from '../../utils/hooks/useGlobalState';
import {CommonActions, useNavigation} from '@react-navigation/native';
import NavigationRoutes from '../../utils/navigation/navigation.routes';

const SplashScreen = () => {
  const {checkAuthentication} = useAuthActions();
  const {status} = useGlobalState(state => state.auth);

  const navigation = useNavigation();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    if (status !== 'unknown') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name:
                status === 'authenticated'
                  ? NavigationRoutes.main.name
                  : NavigationRoutes.auth.name,
            },
          ],
        }),
      );
    }
  }, [navigation, status]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: DefaultTheme.textColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
