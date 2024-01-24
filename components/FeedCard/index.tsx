import Image from "next/image";
import React from "react";

import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";

const FeedCard:React.FC=()=>{
    return <div className="transition cursor-pointer border border-gray-600 border-r-0 border-b-0 border-l-0 p-3 hover:bg-slate-900">

            <div className="grid grid-cols-12 gap-3">
                
            <div className="col-span-1">
                <Image
                src="https://media.licdn.com/dms/image/D4D35AQH8ZQxwnvUlCg/profile-framedphoto-shrink_200_200/0/1672033024603?e=1706608800&v=beta&t=RxPMleMEflyYo0W_bsnQ8P4O3v4wUhUI5LhBwzdE7X4"
                alt="User-Image"
                height={50}
                width={40}
                />

            </div>

            <div className="col-span-11">
                <h5>
                    Suraj Mallick
                </h5>

                <p>is it just me ort  everyoneeeee
                is it just me ort  everyoneeeee
                is it just me ort  everyoneeeee
                is it just me ort  everyoneeeee               
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