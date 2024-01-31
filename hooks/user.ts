import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"


//will fetch the current user from the graphql backend
//requires JWT token
export const useCurrentUser=()=>{
    const query=useQuery({
        queryKey:["current-user"],//this key is keeping the cache
        queryFn:()=>graphqlClient.request(getCurrentUserQuery)//query funtction is the function that will be called to get the data
    })

    return {...query,user:query.data?.getCurrentUser}
}



//the creating of react-query hooks feels just like context api hooks
//create the react-query ocntext and wrap it arounf the app