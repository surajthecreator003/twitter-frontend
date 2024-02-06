import Image from "next/image";
import React from "react";

import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";


interface FeedCardProps{
    data:Tweet
}

const FeedCard:React.FC<FeedCardProps>=(props)=>{

    const {data}=props;
    
    return <div className="  border border-gray-600 border-r-0 border-b-0 border-l-0 p-3 transition hover:bg-slate-900">

            <div className="grid grid-cols-12 gap-3">
                
            <div className="col-span-1">
               {data.author?.profileImageURL      
               &&  
               <Link href={`/${data?.author?.id}`}><Image 
                className="rounded-full"    
                src={data.author?.profileImageURL}
                alt="User-Image"
                height={50}
                width={40}
                />
                </Link>
                }
            </div>

            <div className="col-span-11">
                <h5>
                <Link href={`/${data?.author?.id}`}>{data.author?.firstName} {data.author?.lastName} </Link>
                </h5>

                <p>
                    {data.content}             
                </p>

                <div className="w=[90%] text-lg  mt-5 items-center flex justify-between ">
                    <div>
                    <BiMessageRounded/>
                    </div>

                    <div>
                    <FaRetweet/>
                    </div>

                    <div>
                    <FaRegHeart/>
                    </div>

                    <div>
                    <BiUpload/>
                    </div>
                   
                </div>
            </div>

           </div>
               

    </div>
}

export default FeedCard;