import { graphql } from "@/gql";

//this dosent require JWT token as it is public
export const getAllTweetsQuery = graphql(`
  #graphql

  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);


export const getSignedURLForTweetQuery=graphql(`
#graphql

query GetSignedURL($imageName:String!,$imageType:String!){

  getSignedURLForTweet(imageName:$imageName,imageType:$imageType) 

}
`);