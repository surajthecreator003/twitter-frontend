import TwitterLayout from "@/components/Layout/TwitterLayout";
import type { NextPage } from "next";

//Dynamic Pages for each user*(when you click on each user)
const UserProfilePage: NextPage = () => {
    return (
                 <div>
                    <TwitterLayout>
                        <h1>profile Page</h1>
                    </TwitterLayout>
                 </div>

            )
    
}

export default UserProfilePage;