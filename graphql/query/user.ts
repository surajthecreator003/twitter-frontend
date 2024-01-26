//the normal Query we give in apollo client ame we have to give in frontend

//import {graphql} from "graphql"; worked to initialise the codegen then did
//import {graphql} from "../../gql"; to remove the error
//basically some mistake in installing the graphql-codegen depnedency

import {graphql} from "../../gql";


export const verifyUserGoogleToken =graphql( `#graphql

query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token) 
}

`)