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
      chatRoomUser {
        items {
          chatRoomID
        }
        nextToken
      }
    }
  }
`;
