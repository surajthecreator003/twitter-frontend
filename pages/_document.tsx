
import { Html, Head, Main, NextScript } from "next/document";


//this Document in page router will act as Layout.tsx for all thepages in app router
export default function Document() {
  return (
    <Html lang="en">

      <Head />
      
      <body>
        
        <Main />
        <NextScript />       
      </body>

    </Html>
  );
}
