import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter,Quicksand } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });
//movieng inter to _app.tsx to apply it globally

const quickSand=Quicksand({subsets:["latin"]});

//its like the layout.tsx in app router(expectyou cant have metadata here)
//the Component prop in Page Router is like the children of layout.tsx in app router

export default function App({ Component, pageProps }: AppProps) {
  return <div className={quickSand.className}>
      <Component {...pageProps} />;
    </div>
}
