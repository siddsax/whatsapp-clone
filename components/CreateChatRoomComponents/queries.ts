export const getChatRoomUserID = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      chatRoomUsers {
        items {
          userID
        }
        nextToken
      }
    }
  }
`;

export const getUserChatRoomNName = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      name
      imageUri
      chatRoomUser {
        items {
          chatRoomID
        }
        nextToken
      }
    }
  }
`;

export const listUserChatRoomNName = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        imageUri
        id
        chatRoomUser {
          items {
            chatRoomID
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
