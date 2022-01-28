import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Appbar from '../../components/appbar.component';
import userPlaceHolder from '../../assets/images/user_placeholder.png';
import useGlobalState from '../../utils/hooks/useGlobalState';
import DefaultTheme from '../../utils/theme/default.theme';
import PostComponent from '../../components/post.component';
import {useRoute, RouteProp} from '@react-navigation/native';
import Loading from '../../components/loading.component';
import usePostsActions from '../../store/actions/actionCreators/posts.action-creator';

type ParamList = {
  'main/posts/profile': {user: {name: string; email: string; id: number}};
};

const ProfileScreen = () => {
  const {
    params: {user},
  } = useRoute<RouteProp<ParamList, 'main/posts/profile'>>();
  const {userPosts, isProfileLoading} = useGlobalState(state => state.posts);
  const {getUserPosts} = usePostsActions();

  useEffect(() => {
    getUserPosts(user.id);
  }, [getUserPosts, user.id]);

  return isProfileLoading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <Appbar title="My Profile" backEnabled />
      <View style={styles.userInfo}>
        <Image style={styles.userImage} source={userPlaceHolder} />
        <View>
          <Text style={styles.userNameInfo}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
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

export default ProfileScreen;

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
