import FeedCard from "@/components/FeedCard";
//import { Inter } from "next/font/google";
import { BiHash, BiHome, BiImageAlt, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

import toast from "react-hot-toast";
import { useCallback, useState } from "react";

//GoogleLogin is the google login button and will take you to the login page of google
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

//import { graphql } from "@/gql";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user"; //the react query
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { GetServerSideProps } from "next";

//types for Left Side Bar Nav Buttons
interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

interface HomeProps {
  tweets?: Tweet[];
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  { title: "Home", icon: <BiHome /> },
  { title: "Explore", icon: <BiHash /> },
  { title: "Notifications", icon: <BsBell /> },
  { title: "Messages", icon: <BsEnvelope /> },
  { title: "Bookmarks", icon: <BsBookmark /> },
  { title: "Blue", icon: <FaMoneyBill /> },
  { title: "Profile", icon: <BiUser /> },
  { title: "More", icon: <SlOptions /> },
];

//In Next js Page Router Index.js is the file for "/" path
//and for other paths after "/" its the name of file in pages folder
//kind of similar to app router pages in the root directory

//This will be the Home Page of the App "/"
export default function Home(props:HomeProps) {
  //after login from google Oauth you will get a credentials object from the onSucess callback function in GoogleLogin Button
  //credentials/creds automatically gets printed in console

  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  console.log("Current User feteched and stored in react-query =", user);
  console.log("All Tweets feteched and stored in react-query =", tweets);

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  //basically just create a React input element (that takes only image files) when clicked on the image button
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*"); //accept only image files
    input.click();
  }, []);

  //useCallback to prevent re-rendering of the component and memoize the function
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      console.log("Google Token =", googleToken);

      if (!googleToken) {
        //throw a react toastify error
        toast.error("Google Token Not Found ");

        return;
      }

      //calling the graphql server to verify the google token
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleToken,
        { token: googleToken }
      );

      toast.success("Verifying Google Token is Succesfull");
      console.log("Converted GoogleToken to JWT token =", verifyGoogleToken);

      if (verifyGoogleToken) {
        //after getting the converted JWT token from the graphql server  store it in the local storage
        window.localStorage.setItem("__twitter__token", verifyGoogleToken);
      }

      //for diffrent account login invalidate the current user
      await queryClient.invalidateQueries({ queryKey: ["current-user"] }); // this is good as if we try to login from diffrent account then the current user
      // will be staled and if there is new data then it will be fetched from the graphql server
      //the invalidateQueries function will  make the initially fetched data as stale/rancid and will refetch the data from the graphql server whenver you reload
      //this also makes the use of useCallback here kind of useless as the component will re-render after the invalidateQueries function is called and if there is new Data
      //fetched from the graphql server
    },
    [queryClient]
  ); //queryClient is a react-query

  const handleCreateTweet = useCallback(async () => {
    mutate({
      content,
    });
  }, [content, mutate]); //this will result in rerendering after creting the tweet

  return (
    <div>
      <TwitterLayout>
        <div className="transition cursor-pointer border border-gray-600  p-3 ">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
              {user?.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="User-Image"
                  height={50}
                  width={40}
                />
              )}
            </div>

            <div className="col-span-11">
              <textarea
                placeholder="Whats happening"
                className="border-b borer-slate-700 text-xl px-3 bg-transparent  w-full"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <div className="mt-2 flex justify-between items-center">
                <BiImageAlt onClick={handleSelectImage} className="text-2xl" />
                <button
                  onClick={handleCreateTweet}
                  className=" text-sm px-3 font-semibold  bg-[#1d9bf0] py-1 rounded-full "
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>

          {props.tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
      </TwitterLayout>
    </div>
  );
}


//making alml tweets server side rendered
export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return { props: { tweets: allTweets.getAllTweets as Tweet[] } };
};//need to depreciate the react-query and use the getServerSideProps
