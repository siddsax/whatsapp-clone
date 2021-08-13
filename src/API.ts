/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
  imageUri?: string | null,
  status?: string | null,
  token?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  status?: ModelStringInput | null,
  token?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  imageUri?: string | null,
  status?: string | null,
  token?: string | null,
  chatRoomUser?: ModelChatRoomUserConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelChatRoomUserConnection = {
  __typename: "ModelChatRoomUserConnection",
  items?:  Array<ChatRoomUser | null > | null,
  nextToken?: string | null,
};

export type ChatRoomUser = {
  __typename: "ChatRoomUser",
  id: string,
  userID: string,
  chatRoomID: string,
  user?: User | null,
  chatRoom?: ChatRoom | null,
  createdAt: string,
  updatedAt: string,
};

export type ChatRoom = {
  __typename: "ChatRoom",
  name: string,
  displayNameChat: string,
  id: string,
  chatRoomUsers?: ModelChatRoomUserConnection | null,
  messages?: ModelMessageConnection | null,
  lastMessageID: string,
  lastMessage?: audioMessage | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items?:  Array<Message | null > | null,
  nextToken?: string | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  createdAt: string,
  content: string,
  userID: string,
  chatRoomID: string,
  user?: User | null,
  chatRoom?: ChatRoom | null,
  updatedAt: string,
};

export type audioMessage = {
  __typename: "audioMessage",
  id: string,
  createdAt: string,
  userID: string,
  chatRoomID: string,
  user?: User | null,
  chatRoom?: ChatRoom | null,
  read?: boolean | null,
  content?: S3Object | null,
  readerID?: string | null,
  updatedAt: string,
};

export type S3Object = {
  __typename: "S3Object",
  bucket: string,
  region: string,
  key: string,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  imageUri?: string | null,
  status?: string | null,
  token?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateChatRoomUserInput = {
  id?: string | null,
  userID: string,
  chatRoomID: string,
};

export type ModelChatRoomUserConditionInput = {
  userID?: ModelIDInput | null,
  chatRoomID?: ModelIDInput | null,
  and?: Array< ModelChatRoomUserConditionInput | null > | null,
  or?: Array< ModelChatRoomUserConditionInput | null > | null,
  not?: ModelChatRoomUserConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateChatRoomUserInput = {
  id: string,
  userID?: string | null,
  chatRoomID?: string | null,
};

export type DeleteChatRoomUserInput = {
  id: string,
};

export type CreateChatRoomInput = {
  name: string,
  displayNameChat: string,
  id?: string | null,
  lastMessageID: string,
};

export type ModelChatRoomConditionInput = {
  name?: ModelStringInput | null,
  displayNameChat?: ModelStringInput | null,
  lastMessageID?: ModelIDInput | null,
  and?: Array< ModelChatRoomConditionInput | null > | null,
  or?: Array< ModelChatRoomConditionInput | null > | null,
  not?: ModelChatRoomConditionInput | null,
};

export type UpdateChatRoomInput = {
  name?: string | null,
  displayNameChat?: string | null,
  id: string,
  lastMessageID?: string | null,
};

export type DeleteChatRoomInput = {
  id: string,
};

export type CreateMessageInput = {
  id?: string | null,
  createdAt?: string | null,
  content: string,
  userID: string,
  chatRoomID: string,
};

export type ModelMessageConditionInput = {
  createdAt?: ModelStringInput | null,
  content?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  chatRoomID?: ModelIDInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
};

export type UpdateMessageInput = {
  id: string,
  createdAt?: string | null,
  content?: string | null,
  userID?: string | null,
  chatRoomID?: string | null,
};

export type DeleteMessageInput = {
  id: string,
};

export type CreateAudioMessageInput = {
  id?: string | null,
  createdAt?: string | null,
  userID: string,
  chatRoomID: string,
  read?: boolean | null,
  content?: S3ObjectInput | null,
  readerID?: string | null,
};

export type S3ObjectInput = {
  bucket: string,
  region: string,
  key: string,
};

export type ModelaudioMessageConditionInput = {
  createdAt?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  chatRoomID?: ModelIDInput | null,
  read?: ModelBooleanInput | null,
  readerID?: ModelIDInput | null,
  and?: Array< ModelaudioMessageConditionInput | null > | null,
  or?: Array< ModelaudioMessageConditionInput | null > | null,
  not?: ModelaudioMessageConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateAudioMessageInput = {
  id: string,
  createdAt?: string | null,
  userID?: string | null,
  chatRoomID?: string | null,
  read?: boolean | null,
  content?: S3ObjectInput | null,
  readerID?: string | null,
};

export type DeleteAudioMessageInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  status?: ModelStringInput | null,
  token?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelChatRoomUserFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  chatRoomID?: ModelIDInput | null,
  and?: Array< ModelChatRoomUserFilterInput | null > | null,
  or?: Array< ModelChatRoomUserFilterInput | null > | null,
  not?: ModelChatRoomUserFilterInput | null,
};

export type ModelChatRoomFilterInput = {
  name?: ModelStringInput | null,
  displayNameChat?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastMessageID?: ModelIDInput | null,
  and?: Array< ModelChatRoomFilterInput | null > | null,
  or?: Array< ModelChatRoomFilterInput | null > | null,
  not?: ModelChatRoomFilterInput | null,
};

export type ModelChatRoomConnection = {
  __typename: "ModelChatRoomConnection",
  items?:  Array<ChatRoom | null > | null,
  nextToken?: string | null,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  content?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  chatRoomID?: ModelIDInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export type ModelaudioMessageFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  chatRoomID?: ModelIDInput | null,
  read?: ModelBooleanInput | null,
  readerID?: ModelIDInput | null,
  and?: Array< ModelaudioMessageFilterInput | null > | null,
  or?: Array< ModelaudioMessageFilterInput | null > | null,
  not?: ModelaudioMessageFilterInput | null,
};

export type ModelaudioMessageConnection = {
  __typename: "ModelaudioMessageConnection",
  items?:  Array<audioMessage | null > | null,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    imageUri?: string | null,
    status?: string | null,
    token?: string | null,
    chatRoomUser?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    imageUri?: string | null,
    status?: string | null,
    token?: string | null,
    chatRoomUser?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    imageUri?: string | null,
    status?: string | null,
    token?: string | null,
    chatRoomUser?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChatRoomUserMutationVariables = {
  input: CreateChatRoomUserInput,
  condition?: ModelChatRoomUserConditionInput | null,
};

export type CreateChatRoomUserMutation = {
  createChatRoomUser?:  {
    __typename: "ChatRoomUser",
    id: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChatRoomUserMutationVariables = {
  input: UpdateChatRoomUserInput,
  condition?: ModelChatRoomUserConditionInput | null,
};

export type UpdateChatRoomUserMutation = {
  updateChatRoomUser?:  {
    __typename: "ChatRoomUser",
    id: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatRoomUserMutationVariables = {
  input: DeleteChatRoomUserInput,
  condition?: ModelChatRoomUserConditionInput | null,
};

export type DeleteChatRoomUserMutation = {
  deleteChatRoomUser?:  {
    __typename: "ChatRoomUser",
    id: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChatRoomMutationVariables = {
  input: CreateChatRoomInput,
  condition?: ModelChatRoomConditionInput | null,
};

export type CreateChatRoomMutation = {
  createChatRoom?:  {
    __typename: "ChatRoom",
    name: string,
    displayNameChat: string,
    id: string,
    chatRoomUsers?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      items?:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        content: string,
        userID: string,
        chatRoomID: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastMessageID: string,
    lastMessage?:  {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChatRoomMutationVariables = {
  input: UpdateChatRoomInput,
  condition?: ModelChatRoomConditionInput | null,
};

export type UpdateChatRoomMutation = {
  updateChatRoom?:  {
    __typename: "ChatRoom",
    name: string,
    displayNameChat: string,
    id: string,
    chatRoomUsers?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      items?:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        content: string,
        userID: string,
        chatRoomID: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastMessageID: string,
    lastMessage?:  {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatRoomMutationVariables = {
  input: DeleteChatRoomInput,
  condition?: ModelChatRoomConditionInput | null,
};

export type DeleteChatRoomMutation = {
  deleteChatRoom?:  {
    __typename: "ChatRoom",
    name: string,
    displayNameChat: string,
    id: string,
    chatRoomUsers?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      items?:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        content: string,
        userID: string,
        chatRoomID: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastMessageID: string,
    lastMessage?:  {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    content: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    content: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    content: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateAudioMessageMutationVariables = {
  input: CreateAudioMessageInput,
  condition?: ModelaudioMessageConditionInput | null,
};

export type CreateAudioMessageMutation = {
  createAudioMessage?:  {
    __typename: "audioMessage",
    id: string,
    createdAt: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    read?: boolean | null,
    content?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    readerID?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateAudioMessageMutationVariables = {
  input: UpdateAudioMessageInput,
  condition?: ModelaudioMessageConditionInput | null,
};

export type UpdateAudioMessageMutation = {
  updateAudioMessage?:  {
    __typename: "audioMessage",
    id: string,
    createdAt: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    read?: boolean | null,
    content?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    readerID?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteAudioMessageMutationVariables = {
  input: DeleteAudioMessageInput,
  condition?: ModelaudioMessageConditionInput | null,
};

export type DeleteAudioMessageMutation = {
  deleteAudioMessage?:  {
    __typename: "audioMessage",
    id: string,
    createdAt: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    read?: boolean | null,
    content?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    readerID?: string | null,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    imageUri?: string | null,
    status?: string | null,
    token?: string | null,
    chatRoomUser?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetChatRoomUserQueryVariables = {
  id: string,
};

export type GetChatRoomUserQuery = {
  getChatRoomUser?:  {
    __typename: "ChatRoomUser",
    id: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChatRoomUsersQueryVariables = {
  filter?: ModelChatRoomUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatRoomUsersQuery = {
  listChatRoomUsers?:  {
    __typename: "ModelChatRoomUserConnection",
    items?:  Array< {
      __typename: "ChatRoomUser",
      id: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetChatRoomQueryVariables = {
  id: string,
};

export type GetChatRoomQuery = {
  getChatRoom?:  {
    __typename: "ChatRoom",
    name: string,
    displayNameChat: string,
    id: string,
    chatRoomUsers?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      items?:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        content: string,
        userID: string,
        chatRoomID: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastMessageID: string,
    lastMessage?:  {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChatRoomsQueryVariables = {
  filter?: ModelChatRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatRoomsQuery = {
  listChatRooms?:  {
    __typename: "ModelChatRoomConnection",
    items?:  Array< {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    content: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items?:  Array< {
      __typename: "Message",
      id: string,
      createdAt: string,
      content: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAudioMessageQueryVariables = {
  id: string,
};

export type GetAudioMessageQuery = {
  getAudioMessage?:  {
    __typename: "audioMessage",
    id: string,
    createdAt: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    read?: boolean | null,
    content?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    readerID?: string | null,
    updatedAt: string,
  } | null,
};

export type ListAudioMessagesQueryVariables = {
  filter?: ModelaudioMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAudioMessagesQuery = {
  listAudioMessages?:  {
    __typename: "ModelaudioMessageConnection",
    items?:  Array< {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ChatRoomByNameQueryVariables = {
  name?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelChatRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ChatRoomByNameQuery = {
  chatRoomByName?:  {
    __typename: "ModelChatRoomConnection",
    items?:  Array< {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type MessagesByChatRoomQueryVariables = {
  chatRoomID?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MessagesByChatRoomQuery = {
  messagesByChatRoom?:  {
    __typename: "ModelMessageConnection",
    items?:  Array< {
      __typename: "Message",
      id: string,
      createdAt: string,
      content: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type AudioMessagesByChatRoomQueryVariables = {
  chatRoomID?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelaudioMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AudioMessagesByChatRoomQuery = {
  audioMessagesByChatRoom?:  {
    __typename: "ModelaudioMessageConnection",
    items?:  Array< {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    imageUri?: string | null,
    status?: string | null,
    token?: string | null,
    chatRoomUser?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    imageUri?: string | null,
    status?: string | null,
    token?: string | null,
    chatRoomUser?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    imageUri?: string | null,
    status?: string | null,
    token?: string | null,
    chatRoomUser?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChatRoomUserSubscription = {
  onCreateChatRoomUser?:  {
    __typename: "ChatRoomUser",
    id: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatRoomUserSubscription = {
  onUpdateChatRoomUser?:  {
    __typename: "ChatRoomUser",
    id: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatRoomUserSubscription = {
  onDeleteChatRoomUser?:  {
    __typename: "ChatRoomUser",
    id: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChatRoomSubscription = {
  onCreateChatRoom?:  {
    __typename: "ChatRoom",
    name: string,
    displayNameChat: string,
    id: string,
    chatRoomUsers?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      items?:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        content: string,
        userID: string,
        chatRoomID: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastMessageID: string,
    lastMessage?:  {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatRoomSubscription = {
  onUpdateChatRoom?:  {
    __typename: "ChatRoom",
    name: string,
    displayNameChat: string,
    id: string,
    chatRoomUsers?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      items?:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        content: string,
        userID: string,
        chatRoomID: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastMessageID: string,
    lastMessage?:  {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatRoomSubscription = {
  onDeleteChatRoom?:  {
    __typename: "ChatRoom",
    name: string,
    displayNameChat: string,
    id: string,
    chatRoomUsers?:  {
      __typename: "ModelChatRoomUserConnection",
      items?:  Array< {
        __typename: "ChatRoomUser",
        id: string,
        userID: string,
        chatRoomID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      items?:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        content: string,
        userID: string,
        chatRoomID: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastMessageID: string,
    lastMessage?:  {
      __typename: "audioMessage",
      id: string,
      createdAt: string,
      userID: string,
      chatRoomID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        imageUri?: string | null,
        status?: string | null,
        token?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      chatRoom?:  {
        __typename: "ChatRoom",
        name: string,
        displayNameChat: string,
        id: string,
        lastMessageID: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      read?: boolean | null,
      content?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      readerID?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    content: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    content: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    content: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateAudioMessageSubscription = {
  onCreateAudioMessage?:  {
    __typename: "audioMessage",
    id: string,
    createdAt: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    read?: boolean | null,
    content?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    readerID?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateAudioMessageSubscription = {
  onUpdateAudioMessage?:  {
    __typename: "audioMessage",
    id: string,
    createdAt: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    read?: boolean | null,
    content?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    readerID?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteAudioMessageSubscription = {
  onDeleteAudioMessage?:  {
    __typename: "audioMessage",
    id: string,
    createdAt: string,
    userID: string,
    chatRoomID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      imageUri?: string | null,
      status?: string | null,
      token?: string | null,
      chatRoomUser?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatRoom?:  {
      __typename: "ChatRoom",
      name: string,
      displayNameChat: string,
      id: string,
      chatRoomUsers?:  {
        __typename: "ModelChatRoomUserConnection",
        nextToken?: string | null,
      } | null,
      messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      lastMessageID: string,
      lastMessage?:  {
        __typename: "audioMessage",
        id: string,
        createdAt: string,
        userID: string,
        chatRoomID: string,
        read?: boolean | null,
        readerID?: string | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    read?: boolean | null,
    content?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    readerID?: string | null,
    updatedAt: string,
  } | null,
};
