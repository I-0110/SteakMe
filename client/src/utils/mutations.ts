import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_STEAK = gql`
  mutation addSteak($userId: ID!, $steak: String!) {
    addSteak(userId: $userId, steak: $steak) {
      _id
      name
      steaks
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const REMOVE_STEAK = gql`
  mutation removeSteak($steak: String!) {
    removeSteak(steak: $steak) {
      _id
      name
      steaks
    }
  }
`;
