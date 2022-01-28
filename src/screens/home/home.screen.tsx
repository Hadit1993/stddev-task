import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import useGlobalState from '../../utils/hooks/useGlobalState';
import Loading from '../../components/loading.component';
import PostComponent from '../../components/post.component';
import usePostsActions from '../../store/actions/actionCreators/posts.action-creator';
import Appbar from '../../components/appbar.component';

const HomeScreen = () => {
  const {isLoading, allPosts} = useGlobalState(state => state.posts);
  const {getPosts} = usePostsActions();

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Appbar title="All Posts" isHome />
          <FlatList
            style={styles.container}
            data={allPosts}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({item}) => <PostComponent {...item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
  },
});
