export const onCreateAudioMessageShort = /* GraphQL */ `
  subscription OnCreateAudioMessage {
    onCreateAudioMessage {
      id
      createdAt
      userID
      chatRoomID
      #   user {
      #     id
      #     name
      #     imageUri
      #     status
      #     chatRoomUser {
      #       nextToken
      #     }
      #     createdAt
      #     updatedAt
      #   }
      #   chatRoom {
      #     name
      #     displayNameChat
      #     id
      #     chatRoomUsers {
      #       nextToken
      #     }
      #     messages {
      #       nextToken
      #     }
      #     lastMessageID
      #     lastMessage {
      #       id
      #       createdAt
      #       userID
      #       chatRoomID
      #       read
      #       updatedAt
      #     }
      #     createdAt
      #     updatedAt
      #   }
      read
      content {
        bucket
        region
        key
      }
      #   updatedAt
    }
  }
`;
