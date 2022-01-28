import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAuthActions from '../store/actions/actionCreators/auth.action-creator';
import useGlobalState from '../utils/hooks/useGlobalState';
import NavigationRoutes from '../utils/navigation/navigation.routes';
import Button from './button.component';

interface AppBarProps {
  title: string;
  backEnabled?: boolean;
  isHome?: boolean;
  isProfile?: boolean;
  isAddPost?: boolean;
  isEditPost?: boolean;
  inChat?: boolean;
  onInfoPress?: () => void;
  onAddPost?: () => void;
  onEditPost?: () => void;
}

const Appbar = (props: AppBarProps) => {
  const {navigate, goBack, dispatch} = useNavigation<any>();
  const {logout} = useAuthActions();
  const submitting = useGlobalState(state => state.posts.submitting);
  return (
    <View style={styles.appbarContainer}>
      {props.backEnabled && (
        <Icon
          onPress={goBack}
          style={styles.icon}
          name="arrow-back"
          size={30}
          color="black"
        />
      )}
      <Text style={styles.title}>{props.title}</Text>

      {props.isHome && (
        <Button
          style={styles.button}
          label="Add +"
          onPress={() => {
            navigate(NavigationRoutes.main.posts.name, {
              screen: NavigationRoutes.main.posts.addPost,
              params: {type: 'add'},
            });
          }}
        />
      )}

      {props.isProfile && (
        <Button
          style={styles.button}
          label="Log Out"
          onPress={() => {
            logout();
            dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: NavigationRoutes.auth.name,
                  },
                ],
              }),
            );
          }}
        />
      )}

      {props.isAddPost && (
        <Button
          isLoading={submitting}
          style={styles.button}
          label="CREATE"
          onPress={props.onAddPost}
        />
      )}

      {props.isEditPost && (
        <Button
          isLoading={submitting}
          style={styles.button}
          label="EDIT"
          onPress={props.onEditPost}
        />
      )}

      {props.inChat && (
        <Icon
          onPress={props.onInfoPress}
          style={styles.info}
          name="info-outline"
          size={30}
          color="black"
        />
      )}
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
  button: {position: 'absolute', right: 16, width: 100},
  info: {position: 'absolute', right: 16},
});
