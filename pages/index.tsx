
import { Inter } from "next/font/google";
import { BsTwitter } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

//In Next js Page Router Index.js is the file for "/" path
//and for other paths its the name of path in pages folder


export default function Home() {
  return (
   <div>
    <div className="grid grid-cols-12 h-screen w-screen ">


      <div className="col-span-3 flex justify-end">
      <BsTwitter/>
      </div>

      <div className="col-span-6 border  border-r-[1px] border-l-2-[1px] border-gray-400">
      </div>


      <div className="col-span-3">
      </div>

    </div>
   </div>
  );
}
