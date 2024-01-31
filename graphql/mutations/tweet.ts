import { graphql } from "@/gql";

export const createTweetMutation = graphql(` 

mutation CreateTweet($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
        id
        content
        imageURL
        author {
            firstName
            lastName
            profileImageURL
        }
    } 
 }   
  `)  