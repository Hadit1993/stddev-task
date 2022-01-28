import {ReduxAction} from '..';
import Post from '../../utils/dtos/post.dto';
import PostsActionType from '../actions/actionTypes/posts.action-type';

type PostKeys = 'title' | 'description' | 'website' | 'category';

type PostErrorKeys = PostKeys | 'submit';

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

interface PostsState {
  allPosts: Post[];
  userPosts: Post[];
  isLoading: boolean;
  submitting: boolean;
  categories: string[];
  isProfileLoading: boolean;
  values: {[k in PostKeys]?: string};
  errors: {[k in PostErrorKeys]?: string};
}

const initialPostsState: PostsState = {
  allPosts: [],
  isLoading: false,
  categories,
  values: {category: categories[0]},
  errors: {},
  submitting: false,
  userPosts: [],
  isProfileLoading: false,
};

function PostsReducer(
  state: PostsState = initialPostsState,
  action: ReduxAction<PostsActionType>,
): PostsState {
  switch (action.type) {
    case 'on-post-fetch-start':
      return {...state, isLoading: true};

    case 'on-post-fetch-success':
      return {...state, isLoading: false, allPosts: action.payload};

    case 'on-post-fetch-error':
      return {...state, isLoading: false};

    case 'on-post-submit-start':
      return {...state, submitting: true};

    case 'on-post-submit-success':
      return {
        ...state,
        submitting: false,
        values: {category: state.categories[0]},
        errors: {},
      };

    case 'update-post-errors':
      return {
        ...state,
        submitting: false,
        errors: {...state.errors, ...action.payload},
      };

    case 'update-post-values':
      return {...state, values: {...state.values, ...action.payload}};

    case 'reset-post-values':
      return {...state, values: {category: state.categories[0]}, errors: {}};

    case 'on-user-post-start':
      return {...state, isProfileLoading: true};

    case 'on-user-post-error':
      return {...state, isProfileLoading: false};

    case 'on-user-post-success':
      return {...state, isProfileLoading: false, userPosts: action.payload};

    default:
      return state;
  }
}

export {initialPostsState, PostsReducer};
export type {PostsState, PostKeys, PostErrorKeys};
