//the normal Query we give in apollo client ame we have to give in frontend

//import {graphql} from "graphql"; worked to initialise the codegen then did
//import {graphql} from "../../gql"; to remove the error
//basically some mistake in installing the graphql-codegen depnedency

import { graphql } from "../../gql";

export const verifyUserGoogleToken = graphql(`
  #graphql

  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql

  query GetCurrentUser {
    getCurrentUser {
      id
      email
      lastName
      firstName
      profileImageURL
      tweets {
        id
        content
      }
    }
  }
`);
//this will also passed to react-query as a query function

//this will get the uer by id and also will be used to display all the tweets
export const getUserByIdQuery = graphql(`
  #graphql

  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      lastName
      firstName
      profileImageURL
      tweets {
        id
        content
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);
