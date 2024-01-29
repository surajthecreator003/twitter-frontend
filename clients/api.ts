import {GraphQLClient} from "graphql-request"


//this is for Next js as if the component is server side rendered
//it wont attach the bearer token to the request as there wont be any JWT token and
// if it is the client side rendered
//compoment then it will attach the bearer token to the request 
const isClient=typeof window !=="undefined"

//we will use this graphqlClient to make queries to the backend
export const graphqlClient=new GraphQLClient("http://localhost:8000/graphql",
{//basically just gets the token from the local storage and attaches it to the request
    headers:()=>({Authorization: isClient ? `Bearer ${window.localStorage.getItem("__twitter__token")}` : ""})//header is adding "Bearer" here so no issue here
})