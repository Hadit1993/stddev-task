import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useMemo} from 'react';
import userPlaceholder from '../../assets/images/user_placeholder.png';
import DefaultTheme from '../../utils/theme/default.theme';
import Conversation from '../../utils/dtos/conversation.dto';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);
const timeago = new TimeAgo('en-US');

const MessageHistoryRow = (
  props: {onPress: () => void; userId: number} & Conversation,
) => {
  const lastMessage = useMemo(
    () =>
      props.messages.length
        ? props.messages[props.messages.length - 1]
        : undefined,
    [props.messages],
  );

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.container, styles.paddingContainer]}>
        <Image style={styles.image} source={userPlaceholder} />
        <View style={styles.infoContainer}>
          <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {props.users.find(val => val.id !== props.userId)?.name}
            </Text>
            {lastMessage && (
              <Text style={styles.date}>
                {timeago.format(lastMessage.createdAt)}
              </Text>
            )}
          </View>

          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
            {lastMessage?.text || 'no conversation yet'}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MessageHistoryRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DefaultTheme.textColor,
    flex: 1,
    marginRight: 10,
  },
  infoContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  message: {
    marginTop: 5,
    fontSize: 16,
    color: DefaultTheme.textColor,
  },

  date: {
    fontSize: 12,
    color: 'grey',
  },
  paddingContainer: {
    paddingVertical: 15,
  },
});
