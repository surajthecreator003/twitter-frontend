
import FeedCard from "@/components/FeedCard";
//import { Inter } from "next/font/google";
import { BiHash, BiHome, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";


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
  return (
   <div >
    <div className="grid grid-cols-12 h-screen w-screen px-56 ">


      <div className="col-span-3 border pt-1 px-4 ml-10">
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
          <button className="mx-4 px-4 font-semibold  bg-[#1d9bf0] py-2 rounded-full w-full ">Tweet</button>
          </div>
          
        </div>     
      </div>


      <div className="col-span-5  h-screen overflow-scroll border-r-[1px] border-l-2-[1px] border-gray-600">
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </div>


      <div className="col-span-4">
      </div>

    </div>
   </div>
  );
}
