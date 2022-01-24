import {compose, createStore, Dispatch} from 'redux';
import {initialGlobalState, RootReducer} from './reducers';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  RootReducer,
  initialGlobalState,
  composeEnhancers(),
);

export type ReduxAction<T = any> = {type: T; payload?: any};

export const dispatchAction = <T>(dispatch: Dispatch) => {
  return (action: ReduxAction<T>) => dispatch(action);
};
