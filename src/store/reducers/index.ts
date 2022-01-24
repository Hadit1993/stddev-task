import {combineReducers} from 'redux';
import {authInitialState, AuthReducer, AuthState} from './auth.reducer';

export interface GlobalState {
  auth: AuthState;
}

export const RootReducer = combineReducers({
  auth: AuthReducer,
});

export const initialGlobalState: GlobalState = {
  auth: authInitialState,
};
