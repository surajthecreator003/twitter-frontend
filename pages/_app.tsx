import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter,Quicksand } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import { QueryClientProvider,QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";//appears as a small button on the bottom right corner of the screen
//click it to open the react query dev tools

const inter = Inter({ subsets: ["latin"] });
//movieng inter to _app.tsx to apply it globally

const quickSand=Quicksand({subsets:["latin"]});

const queryClient = new QueryClient();

//its like the layout.tsx in app router(expectyou cant have metadata here)
//the Component prop in Page Router is like the children of layout.tsx in app router

export default function App({ Component, pageProps }: AppProps) {
  return <div className={quickSand.className}>

  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="668428987304-g41g6pn8mvs4j8o7cedgjd360rp7qqc4.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster />
      <ReactQueryDevtools/>
    </GoogleOAuthProvider>
  </QueryClientProvider>

    </div>
}
