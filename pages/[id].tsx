import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import type { NextPage } from "next";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";

//Dynamic Pages for each user*(when you click on each user)
const UserProfilePage: NextPage = () => {

    const { user } = useCurrentUser();//from the react-query hook

    return (
                 <div>
                    <TwitterLayout>
                        <div>
                            <nav className="flex items-center gap-3 py-3 px-3">
                                <BsArrowLeftShort className="text-4xl" />

                                <div>
                                    <h1 className="text-2xl font-bold">
                                       Suraj Mallick
                                    </h1>

                                    <h1 className="text-md font-bold text-slate-500">
                                         1oo Tweets
                                    </h1>
                                </div>
                            </nav>


                           <div className="p-4 bordere-b border-slate-800">
                           {
                                user?.profileImageURL 
                                 &&   
                                 <Image className="rounded-full" 
                                        width={70} height={70} 
                                        src={user?.profileImageURL} 
                                        alt="USer-Image" 
                                 />
                            } 

                            <h1 className="text-2xl font-bold mt-5">
                                Suraj Mallick
                            </h1> 
                            </div> 

                            <div>
                                {user?.tweets?.map((tweet: Tweet | null) => tweet && <FeedCard key={tweet.id} data={tweet} />)}
                            </div>
                            
                        </div>

                    </TwitterLayout>
                 </div>

            )
    
}

export default UserProfilePage;