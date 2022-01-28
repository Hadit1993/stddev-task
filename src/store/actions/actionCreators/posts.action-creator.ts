import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {dispatchAction} from '../..';
import {BASE_URL} from '../../../utils/constants';
import Post from '../../../utils/dtos/post.dto';
import useGlobalState from '../../../utils/hooks/useGlobalState';
import {PostErrorKeys, PostKeys} from '../../reducers/posts.reducer';
import PostsActionType from '../actionTypes/posts.action-type';

const usePostsActions = () => {
  const dispatch = useDispatch();
  const dispatcher = useMemo(
    () => dispatchAction<PostsActionType>(dispatch),
    [dispatch],
  );

  const {
    posts: {
      values: {title, description, category, website},
    },
    auth: {authenticatedUser},
  } = useGlobalState(state => state);

  const onSubmittingStart = useCallback(
    () => dispatcher({type: 'on-post-submit-start'}),
    [dispatcher],
  );

  const onSubmittingSuccess = useCallback(
    () => dispatcher({type: 'on-post-submit-success'}),
    [dispatcher],
  );

  const updateValues = useCallback(
    (values: {[k in PostKeys]?: string}) =>
      dispatcher({type: 'update-post-values', payload: values}),
    [dispatcher],
  );

  const updateErrors = useCallback(
    (values: {[k in PostErrorKeys]?: string}) =>
      dispatcher({type: 'update-post-errors', payload: values}),
    [dispatcher],
  );

  const onFetchPostsSuccess = useCallback(
    (posts: Post[]) =>
      dispatcher({type: 'on-post-fetch-success', payload: posts}),
    [dispatcher],
  );

  const onFetchPostsError = useCallback(
    () => dispatcher({type: 'on-post-fetch-error'}),
    [dispatcher],
  );

  const onFetchPostsStart = useCallback(
    () => dispatcher({type: 'on-post-fetch-start'}),
    [dispatcher],
  );

  const resetPostValues = useCallback(
    () => dispatcher({type: 'reset-post-values'}),
    [dispatcher],
  );

  const onUserPostsStart = useCallback(
    () => dispatcher({type: 'on-user-post-start'}),
    [dispatcher],
  );

  const onUserPostsError = useCallback(
    () => dispatcher({type: 'on-user-post-error'}),
    [dispatcher],
  );

  const onUserPostsSuccess = useCallback(
    (posts: Post[]) =>
      dispatcher({type: 'on-user-post-success', payload: posts}),
    [dispatcher],
  );

  const getUserPosts = useCallback(
    async (id: number) => {
      onUserPostsStart();
      try {
        const result = await fetch(`${BASE_URL}/posts?user_id=${id}`);
        if (result.status === 200) {
          const posts: Post[] = await result.json();
          onUserPostsSuccess(posts);
        } else {
          throw new Error();
        }
      } catch (error) {
        onUserPostsError();
      }
    },
    [onUserPostsError, onUserPostsStart, onUserPostsSuccess],
  );

  const getPosts = useCallback(async () => {
    onFetchPostsStart();

    try {
      const result = await fetch(`${BASE_URL}/posts`);
      if (result.status === 200) {
        const posts: Post[] = await result.json();
        onFetchPostsSuccess(posts);
      } else {
        throw new Error();
      }
    } catch (error) {
      onFetchPostsError();
    }
  }, [onFetchPostsError, onFetchPostsStart, onFetchPostsSuccess]);

  const deletePost = useCallback(
    async (id: number) => {
      try {
        const result = await fetch(`${BASE_URL}/posts/${id}`, {
          method: 'DELETE',
        });
        if (result.status === 200) {
          getPosts();
        }
      } catch (error) {}
    },
    [getPosts],
  );

  const createPost = useCallback(async () => {
    onSubmittingStart();
    const data = {
      title,
      description,
      category,
      website,
      user_id: authenticatedUser?.id,
    };
    try {
      const result = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (result.status === 201) {
        onSubmittingSuccess();
        getPosts();
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      updateErrors({submit: 'unknown error. try again later'});
      return false;
    }
  }, [
    authenticatedUser,
    category,
    description,
    getPosts,
    onSubmittingStart,
    onSubmittingSuccess,
    title,
    updateErrors,
    website,
  ]);

  const editPost = useCallback(
    async (id: number) => {
      onSubmittingStart();
      const data = {
        title,
        description,
        category,
        website,
        user_id: authenticatedUser?.id,
      };
      try {
        const result = await fetch(`${BASE_URL}/posts/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (result.status === 200) {
          onSubmittingSuccess();
          getPosts();
          return true;
        } else {
          throw new Error();
        }
      } catch (error) {
        updateErrors({submit: 'unknown error. try again later'});
        return false;
      }
    },
    [
      authenticatedUser,
      category,
      description,
      getPosts,
      onSubmittingStart,
      onSubmittingSuccess,
      title,
      updateErrors,
      website,
    ],
  );

  return {
    getPosts,
    deletePost,
    updateValues,
    updateErrors,
    createPost,
    resetPostValues,
    editPost,
    getUserPosts,
  };
};

export default usePostsActions;
