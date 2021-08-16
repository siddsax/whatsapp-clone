import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class S3Object {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'updatedAt';
}

type audioMessageMetaData = {
  readOnlyFields: 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly imageUri?: string;
  readonly status?: string;
  readonly token?: string;
  readonly chatRoomUser?: (ChatRoomUser | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class ChatRoomUser {
  readonly id: string;
  readonly user?: User;
  readonly chatRoom?: ChatRoom;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoomUser, ChatRoomUserMetaData>);
  static copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser, ChatRoomUserMetaData>) => MutableModel<ChatRoomUser, ChatRoomUserMetaData> | void): ChatRoomUser;
}

export declare class ChatRoom {
  readonly id: string;
  readonly name: string;
  readonly displayNameChat: string;
  readonly chatRoomUsers?: (ChatRoomUser | null)[];
  readonly messages?: (Message | null)[];
  readonly lastMessageID: string;
  readonly lastMessage?: audioMessage;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class Message {
  readonly id: string;
  readonly createdAt: string;
  readonly content: string;
  readonly user?: User;
  readonly chatRoom?: ChatRoom;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class audioMessage {
  readonly id: string;
  readonly createdAt: string;
  readonly senderProfileURI?: string;
  readonly user?: User;
  readonly chatRoom?: ChatRoom;
  readonly read?: boolean;
  readonly content?: S3Object;
  readonly readerID?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<audioMessage, audioMessageMetaData>);
  static copyOf(source: audioMessage, mutator: (draft: MutableModel<audioMessage, audioMessageMetaData>) => MutableModel<audioMessage, audioMessageMetaData> | void): audioMessage;
}