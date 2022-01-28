import {combineReducers} from 'redux';
import {authInitialState, AuthReducer, AuthState} from './auth.reducer';
import {
  messagesInitialState,
  MessagesReducer,
  MessagesState,
} from './messages.reducer';
import {initialPostsState, PostsReducer, PostsState} from './posts.reducer';

export interface GlobalState {
  auth: AuthState;
  posts: PostsState;
  messages: MessagesState;
}

export const RootReducer = combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  messages: MessagesReducer,
});

export const initialGlobalState: GlobalState = {
  auth: authInitialState,
  posts: initialPostsState,
  messages: messagesInitialState,
};
