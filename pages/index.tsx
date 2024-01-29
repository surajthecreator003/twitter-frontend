
import FeedCard from "@/components/FeedCard";
//import { Inter } from "next/font/google";
import { BiHash, BiHome, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

import toast from "react-hot-toast";
import { useCallback } from "react";

//GoogleLogin is the google login button and will take you to the login page of google
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

//import { graphql } from "@/gql";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";//the react query
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";


//types for Left Side Bar Nav Buttons 
interface TwitterSidebarButton{
  title:string;
  icon:React.ReactNode;
}

const sidebarMenuItems:TwitterSidebarButton[]=[
{title:"Home",icon:<BiHome/>},
{title:"Explore",icon:<BiHash />},
{title:"Notifications",icon:<BsBell />},
{title:"Messages",icon:<BsEnvelope/>},
{title:"Bookmarks",icon:<BsBookmark/>},
{title:"Blue",icon:<FaMoneyBill/>},
{title:"Profile",icon:<BiUser/>},
{title:"More",icon:<SlOptions/>}



]


//In Next js Page Router Index.js is the file for "/" path
//and for other paths after "/" its the name of file in pages folder
//kind of similar to app router pages in the root directory

//This will be the Home Page of the App "/"
export default function Home() {

  //after login from google Oauth you will get a credentials object from the onSucess callback function in GoogleLogin Button
  //credentials/creds automatically gets printed in console


  const {user}=useCurrentUser();
  console.log("Current User feteched and stored in react-query =",user);

  const queryClient=useQueryClient()

  //useCallback to prevent re-rendering of the component and memoize the function
 const handleLoginWithGoogle=useCallback(async(cred:CredentialResponse)=>{

  const googleToken=cred.credential;
  console.log("Google Token =",googleToken);

  if (!googleToken){

    //throw a react toastify error
    toast.error("Google Token Not Found ");

    return;
    
  }
  
  //calling the graphql server to verify the google token
  const {verifyGoogleToken}= await graphqlClient.request(verifyUserGoogleToken,{token:googleToken});

 
  toast.success("Verifying Google Token is Succesfull");
  console.log("Converted GoogleToken to JWT token =",verifyGoogleToken);

  if(verifyGoogleToken){//after getting the converted JWT token from the graphql server  store it in the local storage 
    window.localStorage.setItem("__twitter__token",verifyGoogleToken)
  }

  await queryClient.invalidateQueries({ queryKey: ["current-user"] }); // invalidate the user query in react-query to refetch the user data from the graphql server

 },[queryClient])


  return (
   <div >
    <div className="grid grid-cols-12 h-screen w-screen px-56 ">


      <div className="col-span-3 border pt-1 px-4 ml-10 relative">
        <div className=" transition-all cursor-pointer h-fit w-fit text-2xl hover:bg-gray-600  p-5 rounded-full">
        <FaXTwitter  />
        </div> 

        <div className="mt-1 text-1xl  pr-4">
          <ul>
          {sidebarMenuItems.map((item,index)=>
            <li key={item.title} className= " mt-2 p-4 w-fit rounded-lg px-3 py-2 hover:bg-gray-800 flex justify-start items-center gap-4">
            <span className="text-3xl">{item.icon}</span>  
            <span>{item.title}</span>
            </li>)}
          </ul>

          


          <div className="mt-5 px-3">
          <button className="mx-4 px-3 font-semibold  bg-[#1d9bf0] py-2 rounded-full w-full ">
            Tweet
            </button>
          </div>         
        </div> 
        

        {user  && <div className="px-3 py-2 bg-slate-800 p-3 rounded-full items-center absolute bottom-5 flex gap-2 tex-xl">
          {user && user?.profileImageURL && <Image src={user?.profileImageURL} alt="profile" 
                                                    height={50} 
                                                    width={50}
                                                    className="rounded-full h-15 w-15"/>
                                                    
                                                    }
            <div>
            <h3>{user.firstName}</h3> 
            <h3>{user.lastName}</h3> </div>                                        
           

        </div>}
            
      </div>


      <div className="col-span-5  h-screen overflow-scroll border-r-[1px] border-l-2-[1px] border-gray-600">
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </div>


      <div className="col-span-4 p-5">

        {!user  && <div className="border p-5 bg-slate-700 rounded-lg">
          <h1 className="my-2 text-2xl">New to Twitter ?</h1>
          <GoogleLogin onSuccess={handleLoginWithGoogle} />
        </div>
        }
           
      </div>

    </div>
   </div>
  );
}
