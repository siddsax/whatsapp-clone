/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getChatRoomUser = /* GraphQL */ `
  query GetChatRoomUser($id: ID!) {
    getChatRoomUser(id: $id) {
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
export const listChatRoomUsers = /* GraphQL */ `
  query ListChatRoomUsers(
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAudioMessage = /* GraphQL */ `
  query GetAudioMessage($id: ID!) {
    getAudioMessage(id: $id) {
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
export const listAudioMessages = /* GraphQL */ `
  query ListAudioMessages(
    $filter: ModelaudioMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudioMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const chatRoomByName = /* GraphQL */ `
  query ChatRoomByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const messagesByChatRoom = /* GraphQL */ `
  query MessagesByChatRoom(
    $chatRoomID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoom(
      chatRoomID: $chatRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const audioMessagesByChatRoom = /* GraphQL */ `
  query AudioMessagesByChatRoom(
    $chatRoomID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelaudioMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    audioMessagesByChatRoom(
      chatRoomID: $chatRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
