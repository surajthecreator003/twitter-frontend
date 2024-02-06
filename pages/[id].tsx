//THIS IS A SSR PAGE
import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { userInfo } from "os";
import { BsArrowLeftShort } from "react-icons/bs";

interface ServerProps {
  userInfo?: User;
}

//Dynamic Pages for each user*(when you click on each user)
const UserProfilePage: NextPage<ServerProps> = (props) => {
  const { user } = useCurrentUser(); //from the react-query hook

  console.log("props=",props)//will be printed on the client

  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex items-center gap-3 py-3 px-3">
            <BsArrowLeftShort className="text-4xl" />

            <div>
              <h1 className="text-2xl font-bold">{`${props.userInfo?.firstName} ${props.userInfo?.lastName}`}</h1>

              <h1 className="text-md font-bold text-slate-500">{props.userInfo?.tweets?.length}</h1>
            </div>
          </nav>

          <div className="p-4 bordere-b border-slate-800">
            {props.userInfo?.profileImageURL && (
              <Image
                className="rounded-full"
                width={70}
                height={70}
                src={props.userInfo?.profileImageURL}
                alt="USer-Image"
              />
            )}

            <h1 className="text-2xl font-bold mt-5">{`${props.userInfo?.firstName} ${props.userInfo?.lastName}`}</h1>
          </div>

          <div>
            {props.userInfo?.tweets?.map(
              (tweet: Tweet | null) =>
                tweet && <FeedCard key={tweet.id} data={tweet} />
            )}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

//basically we are just creating a server side rendered component(SSR)
//this will fetch data  on server side and will pass it on to the Client for Hydration
//we did this as because if the user makes a new tweet then if we are viewing some user and come back to thius user then it will]
//show the Profile of the user with the updated data
export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context //this context is the id of the user and this getServereSideProps will run whenver we click on a user profile
) => {
  //id will contain the id of the user present in PostgreSQL database and will be sent by us
  const id = context.query.id as string | undefined; //that jwt token we pass on in context will have the id

  //console.log("context=",context)
  //console.log("id=",id);

  if (!id) {
    return { notFound: true, props: { userInfo: undefined } };
  }

  //getting the user by id
  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });
  console.log("userInfo=",userInfo);

  if (!userInfo) {
    return { notFound: true };
  }

  return {
    props: { userInfo: userInfo.getUserById as User },
  };
}; //this will work only if you go back kand click on the user profile again as the data will be fetched again
//aint gonna have react query here for updating the USer Profile Component

export default UserProfilePage;
