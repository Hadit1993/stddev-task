import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import Conversation from '../../utils/dtos/conversation.dto';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import useMessagesActionCreator from '../../store/actions/actionCreators/messages.action-creator';
import useGlobalState from '../../utils/hooks/useGlobalState';
import Appbar from '../../components/appbar.component';
import firestore from '@react-native-firebase/firestore';
import NavigationRoutes from '../../utils/navigation/navigation.routes';

type ParamList = {
  'main/messages/chat': {
    id: string;
  };
};

const ChatScreen = () => {
  const {navigate} = useNavigation<any>();
  const {
    params: {id},
  } = useRoute<RouteProp<ParamList, 'main/messages/chat'>>();
  const conversations = useGlobalState(state => state.messages.conversations);
  const authenticatedUser = useGlobalState(
    state => state.auth.authenticatedUser,
  );

  const conversation = useMemo(
    () => conversations.find(val => val.id === id),
    [conversations, id],
  );

  const [messages, setMessages] = useState<IMessage[]>([]);

  console.log({conversation});

  const {addMessage} = useMessagesActionCreator();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Conversations')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
        const newMessages = documentSnapshot!
          .data()!
          .messages.map((message: any) => ({
            ...message,
            createdAt: new Date(message.createdAt.toDate()),
          }));

        addMessage({id, messages: newMessages});

        setMessages(newMessages.reverse());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [addMessage, id]);

  const onSend = useCallback(
    (messages = []) => {
      // addMessage({id: id, messages});
      firestore()
        .doc(`Conversations/${id}`)
        .update({messages: firestore.FieldValue.arrayUnion(...messages)});
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [id],
  );
  return (
    <View style={styles.container}>
      <Appbar
        title="Chat"
        backEnabled
        inChat
        onInfoPress={() => {
          const user = conversation?.users.find(
            val => val.id !== authenticatedUser?.id,
          );
          navigate(NavigationRoutes.main.posts.name, {
            screen: NavigationRoutes.main.posts.profile,
            params: {user},
          });
        }}
      />
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={m => onSend(m)}
          user={{
            _id: authenticatedUser!.id,
          }}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
