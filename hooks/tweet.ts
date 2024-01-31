import { graphqlClient } from "@/clients/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {getAllTweetsQuery } from "@/graphql/query/tweet"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutations/tweet"
import toast from "react-hot-toast"

  

//will be useed to create  a tweet
export const useCreateTweet=()=>{

    const queryClient=useQueryClient();
     
    const mutation=useMutation({
        mutationFn:(payload:CreateTweetData)=>graphqlClient.request(createTweetMutation,{payload}),

        onMutate:(payload)=>toast.loading("Creating Tweet...",{id:"1"}),//will show a laoding after creating the tweet

        onSuccess:async (payload)=>{ 
                            await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });

                            toast.success("Tweet Created Successfully",{id:"1"});
                        }//after creating a tweet just invalidate the all-tweets react-query item so
                         //while re-rendering all the tweets will be fetched again and will be shown
        
    })
    
    return mutation;

}


export const useGetAllTweets=()=>{

    //run codegen to get the types if it creates error
    const query=useQuery({
        queryKey:["all-tweets"],
        queryFn:()=>graphqlClient.request(getAllTweetsQuery)
    })
    
    return {...query,tweets:query.data?.getAllTweets}

}    

