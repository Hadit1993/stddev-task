import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Appbar from '../../components/appbar.component';
import MessageHistoryRow from './message-history-row.component';

import useGlobalState from '../../utils/hooks/useGlobalState';

import useMessagesActionCreator from '../../store/actions/actionCreators/messages.action-creator';
import Loading from '../../components/loading.component';
import {useNavigation} from '@react-navigation/native';
import NavigationRoutes from '../../utils/navigation/navigation.routes';

const MessageListScreen = () => {
  const {authenticatedUser} = useGlobalState(state => state.auth);

  const {conversations, isLoading} = useGlobalState(state => state.messages);
  const {getConversations} = useMessagesActionCreator();

  const {navigate} = useNavigation<any>();

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return isLoading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <Appbar title="Chat" />

      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={conversations}
        keyExtractor={value => value.id}
        renderItem={({item}) => (
          <MessageHistoryRow
            {...item}
            onPress={() => {
              navigate(NavigationRoutes.main.messages.name, {
                screen: NavigationRoutes.main.messages.chat,
                params: {id: item.id},
              });
            }}
            userId={authenticatedUser!.id}
          />
        )}
      />
    </View>
  );
};

export default MessageListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  separator: {height: 0.5, backgroundColor: 'black'},
});

// const result = await firestore()
//   .collection('Conversations')
//   .where('users', 'array-contains', {
//     id: authenticatedUser!.id,
//     name: `${authenticatedUser?.first_name} ${authenticatedUser?.last_name}`,
//   })
//   .get();
// const data = result.docs.map(doc => ({...doc.data(), id: doc.id}));

// console.log({data});
