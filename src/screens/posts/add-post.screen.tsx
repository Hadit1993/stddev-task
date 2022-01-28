import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

import Appbar from '../../components/appbar.component';
import placeholder from '../../assets/images/image_placeholder.png';
import Input from '../../components/input.component';
import useGlobalState from '../../utils/hooks/useGlobalState';
import usePostsActions from '../../store/actions/actionCreators/posts.action-creator';
import NavigationRoutes from '../../utils/navigation/navigation.routes';
import {
  validatePostCategory,
  validatePostDescription,
  validatePostTitle,
} from '../../utils/validations';

type ParamList = {
  'main/posts/add-post': {
    type: 'add' | 'edit';
    id?: number;
  };
};

const AddPostScreen = () => {
  const {params} = useRoute<RouteProp<ParamList, 'main/posts/add-post'>>();
  const {values, errors, categories} = useGlobalState(state => state.posts);
  const {updateValues, updateErrors, createPost, resetPostValues, editPost} =
    usePostsActions();
  const {navigate} = useNavigation<any>();

  const validateInputs = () => {
    const titleError = validatePostTitle(values.title);
    const descriptionError = validatePostDescription(values.description);
    const categoryError = validatePostCategory(values.category);
    updateErrors({
      title: titleError,
      description: descriptionError,
      category: categoryError,
    });

    return !(titleError || descriptionError || categoryError);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetPostValues();
      };
    }, [resetPostValues]),
  );

  return (
    <View style={styles.container}>
      <Appbar
        title={params.type === 'add' ? 'Add Post' : 'EditPost'}
        backEnabled
        isAddPost={params.type === 'add'}
        isEditPost={params.type === 'edit'}
        onAddPost={async () => {
          if (validateInputs()) {
            const success = await createPost();
            if (success) {
              navigate(NavigationRoutes.main.home);
            }
          }
        }}
        onEditPost={async () => {
          if (validateInputs()) {
            const success = await editPost(params.id!);
            if (success) {
              navigate(NavigationRoutes.main.home);
            }
          }
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.scrollRoot}>
          <Image source={placeholder} style={styles.image} />

          <Input
            value={values.title}
            onChangeText={title => updateValues({title})}
            placeholder="title"
            iconName="info-outline"
            error={errors.title}
          />
          <Input
            onChangeText={description => updateValues({description})}
            value={values.description}
            placeholder="description"
            iconName="info-outline"
            error={errors.description}
          />

          <Input
            dropDown={{
              options: categories,
              onSelect: category => {
                updateValues({category});
              },
              selected: values.category,
            }}
            error={errors.category}
          />
          <Input
            keyboardType="url"
            onChangeText={website => updateValues({website})}
            value={values.website}
            placeholder="website"
            iconName="language"
          />

          {!!errors.submit && (
            <Text style={styles.submitError}>{errors.submit}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollRoot: {
    padding: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
  },
  submitError: {
    color: 'red',
    fontSize: 12,
    marginTop: 15,
  },
});
