import {Image, StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import Post from '../utils/dtos/post.dto';
import placeholder from '../assets/images/image_placeholder.png';
import Button from './button.component';
import {useNavigation} from '@react-navigation/native';
import NavigationRoutes from '../utils/navigation/navigation.routes';
import DefaultTheme from '../utils/theme/default.theme';
import useGlobalState from '../utils/hooks/useGlobalState';
import usePostsActions from '../store/actions/actionCreators/posts.action-creator';

const PostComponent = (props: Post) => {
  const {navigate} = useNavigation<any>();
  const {authenticatedUser} = useGlobalState(state => state.auth);
  const {deletePost, updateValues} = usePostsActions();
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={placeholder} />
        <Button
          onPress={() => {
            navigate(NavigationRoutes.main.posts.name, {
              screen: NavigationRoutes.main.posts.postDetail,
              params: {post: props},
            });
          }}
          labelStyle={styles.buttonLabel}
          style={styles.detailsButton}
          label="Details"
        />
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {props.title}
        </Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {props.description}
        </Text>
        {authenticatedUser && authenticatedUser.id === props.user_id && (
          <View style={styles.rowButtons}>
            <Button
              onPress={() => {
                Alert.alert(
                  'Delete',
                  'Are you sure you want to delete this post?',
                  [
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        deletePost(props.id);
                      },
                    },
                  ],
                );
              }}
              labelStyle={styles.buttonLabel}
              style={[styles.detailsButton, styles.delBtn]}
              label="Delete"
            />
            <Button
              onPress={() => {
                updateValues({
                  title: props.title,
                  description: props.description,
                  category: props.category,
                  website: props.website,
                });
                navigate(NavigationRoutes.main.posts.name, {
                  screen: NavigationRoutes.main.posts.addPost,
                  params: {type: 'edit', id: props.id},
                });
              }}
              labelStyle={styles.buttonLabel}
              style={[styles.detailsButton, styles.editBtn]}
              label="Edit"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  detailsButton: {
    width: 100,
    height: 35,
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  rightColumn: {
    alignItems: 'center',
    width: '100%',
    marginLeft: 10,

    flex: 1,
  },
  title: {
    fontSize: 20,
    color: DefaultTheme.textColor,
  },
  description: {color: 'grey', fontSize: 18, marginTop: 10},
  rowButtons: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  editBtn: {
    width: 50,
  },
  delBtn: {
    width: 70,
    marginRight: 5,
  },
});
