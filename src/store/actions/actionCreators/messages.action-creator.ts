import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {dispatchAction} from '../..';
import Conversation from '../../../utils/dtos/conversation.dto';
import useGlobalState from '../../../utils/hooks/useGlobalState';
import MessagesActionType from '../actionTypes/messages.action-type';
import firestore from '@react-native-firebase/firestore';
import {IMessage} from 'react-native-gifted-chat';

const useMessagesActionCreator = () => {
  const dispatch = useDispatch();
  const dispatcher = useMemo(
    () => dispatchAction<MessagesActionType>(dispatch),
    [dispatch],
  );

  const {authenticatedUser} = useGlobalState(state => state.auth);

  const startFetchConversations = useCallback(
    () => dispatcher({type: 'start-fetch-conversations'}),
    [dispatcher],
  );

  const onFetchConversationsFailed = useCallback(
    (error: string) =>
      dispatcher({type: 'on-fetch-conversations-failed', payload: error}),
    [dispatcher],
  );

  const onFetchConversationsSuccess = useCallback(
    (conversations: Conversation[]) =>
      dispatcher({
        type: 'on-fetch-conversations-success',
        payload: conversations,
      }),
    [dispatcher],
  );

  const addMessage = useCallback(
    (data: {id: string; messages: IMessage[]}) => {
      // firestore()
      //   .doc(`Conversations/${data.id}`)
      //   .update({messages: firestore.FieldValue.arrayUnion(...data.messages)});
      return dispatcher({
        type: 'add-message',
        payload: data,
      });
    },

    [dispatcher],
  );

  const getConversations = useCallback(async () => {
    startFetchConversations();
    try {
      const result = await firestore()
        .collection('Conversations')
        .where('users', 'array-contains', {
          id: authenticatedUser!.id,
          name: `${authenticatedUser?.first_name} ${authenticatedUser?.last_name}`,
          email: authenticatedUser?.email,
        })
        .get();

      const data = result.docs.map(doc => ({
        ...doc.data(),
        messages: doc.data().messages.map((message: any) => ({
          ...message,
          createdAt: new Date(message.createdAt.toDate()),
        })),
        id: doc.id,
      })) as Conversation[];

      onFetchConversationsSuccess(data);
    } catch (error) {
      console.log({error});
      onFetchConversationsFailed('unknown error. try again later');
    }
  }, [
    authenticatedUser,
    onFetchConversationsFailed,
    onFetchConversationsSuccess,
    startFetchConversations,
  ]);

  return {getConversations, addMessage};
};

export default useMessagesActionCreator;
