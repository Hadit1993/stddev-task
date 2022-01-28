import {GiftedChat} from 'react-native-gifted-chat';
import {ReduxAction} from '..';
import Conversation from '../../utils/dtos/conversation.dto';
import MessagesActionType from '../actions/actionTypes/messages.action-type';

interface MessagesState {
  conversations: Conversation[];
  isLoading: boolean;
  error?: string;
}

const messagesInitialState: MessagesState = {
  conversations: [],
  isLoading: false,
};

function MessagesReducer(
  state: MessagesState = messagesInitialState,
  action: ReduxAction<MessagesActionType>,
): MessagesState {
  switch (action.type) {
    case 'start-fetch-conversations':
      return {...state, isLoading: true};
    case 'on-fetch-conversations-failed':
      return {...state, isLoading: false, error: action.payload};

    case 'on-fetch-conversations-success':
      return {
        conversations: action.payload,
        isLoading: false,
        error: undefined,
      };
    case 'add-message':
      const currentState = {...state};

      const index = state.conversations.findIndex(
        val => val.id === action.payload.id,
      );
      if (index >= 0) {
        // currentState.conversations[index] = {
        //   ...currentState.conversations[index],
        //   messages: [
        //     ...currentState.conversations[index].messages,
        //     ...action.payload.messages,
        //   ],
        // };
        currentState.conversations[index] = {
          ...currentState.conversations[index],
          messages: [
            // ...currentState.conversations[index].messages,
            ...action.payload.messages,
          ],
        };
      }
      return currentState;
    default:
      return state;
  }
}
export type {MessagesState};

export {messagesInitialState, MessagesReducer};
