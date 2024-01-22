import "@/styles/globals.css";
import type { AppProps } from "next/app";



//its like the layout.tsx in app router(expectyou cant have metadata here)
//the Component prop in Page Router is like the children of layout.tsx in app router

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
