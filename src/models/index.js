// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, ChatRoomUser, ChatRoom, Message, audioMessage, S3Object } = initSchema(schema);

export {
  User,
  ChatRoomUser,
  ChatRoom,
  Message,
  audioMessage,
  S3Object
};