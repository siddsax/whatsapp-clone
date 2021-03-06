/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      token
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      token
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      token
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      name
      displayNameChat
      id
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        senderProfileURI
        userID
        chatRoomID
        user {
          id
          name
          imageUri
          status
          token
          createdAt
          updatedAt
        }
        chatRoom {
          name
          displayNameChat
          id
          lastMessageID
          createdAt
          updatedAt
        }
        read
        content {
          bucket
          region
          key
        }
        readerID
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      name
      displayNameChat
      id
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        senderProfileURI
        userID
        chatRoomID
        user {
          id
          name
          imageUri
          status
          token
          createdAt
          updatedAt
        }
        chatRoom {
          name
          displayNameChat
          id
          lastMessageID
          createdAt
          updatedAt
        }
        read
        content {
          bucket
          region
          key
        }
        readerID
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      name
      displayNameChat
      id
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        senderProfileURI
        userID
        chatRoomID
        user {
          id
          name
          imageUri
          status
          token
          createdAt
          updatedAt
        }
        chatRoom {
          name
          displayNameChat
          id
          lastMessageID
          createdAt
          updatedAt
        }
        read
        content {
          bucket
          region
          key
        }
        readerID
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const createAudioMessage = /* GraphQL */ `
  mutation CreateAudioMessage(
    $input: CreateAudioMessageInput!
    $condition: ModelaudioMessageConditionInput
  ) {
    createAudioMessage(input: $input, condition: $condition) {
      id
      createdAt
      senderProfileURI
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      read
      content {
        bucket
        region
        key
      }
      readerID
      updatedAt
    }
  }
`;
export const updateAudioMessage = /* GraphQL */ `
  mutation UpdateAudioMessage(
    $input: UpdateAudioMessageInput!
    $condition: ModelaudioMessageConditionInput
  ) {
    updateAudioMessage(input: $input, condition: $condition) {
      id
      createdAt
      senderProfileURI
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      read
      content {
        bucket
        region
        key
      }
      readerID
      updatedAt
    }
  }
`;
export const deleteAudioMessage = /* GraphQL */ `
  mutation DeleteAudioMessage(
    $input: DeleteAudioMessageInput!
    $condition: ModelaudioMessageConditionInput
  ) {
    deleteAudioMessage(input: $input, condition: $condition) {
      id
      createdAt
      senderProfileURI
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        token
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        name
        displayNameChat
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          senderProfileURI
          userID
          chatRoomID
          read
          readerID
          updatedAt
        }
        createdAt
        updatedAt
      }
      read
      content {
        bucket
        region
        key
      }
      readerID
      updatedAt
    }
  }
`;
