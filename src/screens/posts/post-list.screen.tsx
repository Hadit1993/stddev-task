import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Appbar from '../../components/appbar.component';
import userPlaceHolder from '../../assets/images/user_placeholder.png';
import useGlobalState from '../../utils/hooks/useGlobalState';
import DefaultTheme from '../../utils/theme/default.theme';
import PostComponent from '../../components/post.component';

const PostListScreen = () => {
  const {
    auth: {authenticatedUser},
    posts: {allPosts},
  } = useGlobalState(state => state);

  const userPosts = useMemo(
    () => allPosts.filter(val => val.user_id === authenticatedUser?.id),
    [allPosts, authenticatedUser?.id],
  );
  return (
    <View style={styles.container}>
      <Appbar title="My Profile" isProfile />
      <View style={styles.userInfo}>
        <Image style={styles.userImage} source={userPlaceHolder} />
        <View>
          <Text style={styles.userNameInfo}>
            {authenticatedUser?.first_name} {authenticatedUser?.last_name}
          </Text>
          <Text style={styles.userEmail}>{authenticatedUser?.email}</Text>
        </View>
      </View>

      <Text style={styles.header}>My Posts</Text>
      {userPosts.length > 0 ? (
        <FlatList
          data={userPosts}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item}) => <PostComponent {...item} />}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>You have no posts yet</Text>
        </View>
      )}
    </View>
  );
};

export default PostListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userNameInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DefaultTheme.textColor,
  },
  userEmail: {
    fontSize: 16,
    color: 'grey',
    marginTop: 5,
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
  },
  contentContainerStyle: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
