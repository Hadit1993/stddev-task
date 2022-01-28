import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Post from '../../utils/dtos/post.dto';
import {RouteProp, useRoute} from '@react-navigation/native';
import Appbar from '../../components/appbar.component';
import placeholder from '../../assets/images/image_placeholder.png';
import DefaultTheme from '../../utils/theme/default.theme';

type ParamList = {
  'main/posts/post-detail': {
    post: Post;
  };
};

const PostDetailScreen = () => {
  const {
    params: {post},
  } = useRoute<RouteProp<ParamList, 'main/posts/post-detail'>>();
  return (
    <View style={styles.container}>
      <Appbar title="Post Detail" backEnabled />
      <ScrollView style={styles.container}>
        <View style={styles.scrollRoot}>
          <Image source={placeholder} style={styles.image} />
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollRoot: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 15,
  },
  title: {
    marginTop: 15,
    color: DefaultTheme.textColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: 'grey',
    marginTop: 15,
    textAlign: 'center',
  },
});
