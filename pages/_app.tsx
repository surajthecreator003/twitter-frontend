import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter,Quicksand } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
//movieng inter to _app.tsx to apply it globally

const quickSand=Quicksand({subsets:["latin"]});

//its like the layout.tsx in app router(expectyou cant have metadata here)
//the Component prop in Page Router is like the children of layout.tsx in app router

export default function App({ Component, pageProps }: AppProps) {
  return <div className={quickSand.className}>

    <GoogleOAuthProvider clientId="668428987304-g41g6pn8mvs4j8o7cedgjd360rp7qqc4.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster />
      </GoogleOAuthProvider>

    </div>
}
