/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
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
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
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
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateAudioMessage = /* GraphQL */ `
  subscription OnCreateAudioMessage {
    onCreateAudioMessage {
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
export const onUpdateAudioMessage = /* GraphQL */ `
  subscription OnUpdateAudioMessage {
    onUpdateAudioMessage {
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
export const onDeleteAudioMessage = /* GraphQL */ `
  subscription OnDeleteAudioMessage {
    onDeleteAudioMessage {
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
