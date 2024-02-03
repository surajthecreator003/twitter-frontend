import React, { useCallback, useMemo } from "react";

import { BiHash, BiHome, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyUserGoogleToken } from "@/graphql/query/user";
import { graphqlClient } from "@/clients/api";
import Link from "next/link";

import { useRouter } from "next/router";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

//types for Left Side Bar Nav Buttons
interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const queryClient = useQueryClient();

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

  const { user } = useCurrentUser();

  const router=useRouter();
  console.log(router.query.id)//checking id
  

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      { title: "Home", icon: <BiHome />, link: "/" },
      { title: "Explore", icon: <BiHash />, link: "/Explore" },
      { title: "Notifications", icon: <BsBell />, link: "/Notifications" },
      { title: "Messages", icon: <BsEnvelope />, link: "/Messages" },
      { title: "Bookmarks", icon: <BsBookmark />, link: "/Bookmarks" },
      { title: "Blue", icon: <FaMoneyBill />, link: "/Blue" },
      { title: "Profile", icon: <BiUser />, link: `/${user?.id}` },
      { title: "More", icon: <SlOptions />, link: "/More" },
    ],
    [user?.id]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56 ">
        {/*The Left Side Bar Nav Buttons with Profile Icon  */}
        <div className="pr-4 col-span-2 sm:col-span-3  pt-1 px-4 flex sm:justify-end relative">
          <div>
            {/*The Main Twitter Logo  */}
            <div className=" transition-all cursor-pointer h-fit w-fit text-2xl hover:bg-gray-600  p-5 rounded-full">
              <FaXTwitter />
            </div>

            {/*The Left Side Bar Nav Buttons only  */}
            <div className="mt-1 text-1xl  pr-4">
              <ul>
                {sidebarMenuItems.map((item, index) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className=" mt-2 p-4 w-fit rounded-lg px-3 py-2 hover:bg-gray-800 flex justify-start items-center gap-4"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-5 px-3">
                <button className="hidden sm:block  mx-4 px-3 font-semibold  bg-[#1d9bf0] py-2 rounded-full w-full ">
                  Tweet
                </button>

                <button className="block sm:hidden  mx-4 px-3 font-semibold   py-2 rounded-full ">
                  <FaXTwitter />
                </button>
              </div>
            </div>
          </div>

          {/*The Profile image that will appear on the right bottom corner after you log in  */}
          {user && (
            <div className="px-3 py-2 bg-slate-800 p-3 rounded-full items-center absolute bottom-5 flex gap-2 tex-xl">
              {user && user?.profileImageURL && (
                <Image
                  src={user?.profileImageURL}
                  alt="profile"
                  height={50}
                  width={50}
                  className="rounded-full h-15 w-15"
                />
              )}

              <div className="hidden sm:block">
                <h3>{user.firstName}</h3>
                <h3>{user.lastName}</h3>
              </div>
            </div>
          )}
        </div>

        {/*The Main Tweets part or the profile part  that willl show up at the middle when clicked on user */}
        <div className="col-span-10 sm:col-span-5  h-screen overflow-scroll border-r-[1px] border-l-2-[1px] border-gray-600">
          {props.children}
        </div>

        {/*The Sign Up/Login Button appearing on the top right corner */}
        <div className="col-span-0 sm:col-span-4 p-5">
          <div>
            {!user && (
              <div className="border p-5 bg-slate-700 rounded-lg">
                <h1 className="my-2 text-2xl">New to Twitter ?</h1>
                <GoogleLogin onSuccess={handleLoginWithGoogle} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;
//Separating the whole Sidebar and the Signup on one Component aand making it a layout as
//it is gonna be rendered on every page
