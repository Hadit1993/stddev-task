import {IMessage} from 'react-native-gifted-chat';

export default interface Conversation {
  users: [
    {id: number; name: string; email: string},
    {id: number; name: string; email: string},
  ];
  id: string;
  messages: IMessage[];
}
