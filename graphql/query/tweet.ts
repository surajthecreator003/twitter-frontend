import { graphql } from "@/gql";

//this dosent require JWT token as it is public
export const getAllTweetsQuery=graphql(`#graphql

query GetAllTweets {
    getAllTweets {
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