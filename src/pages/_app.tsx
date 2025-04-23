import "@/styles/globals.css";
import type { AppProps } from "next/app";
import  SignVol  from "./SignVol";
import  SignCom  from "./SignCom";
import  EnterVol  from "./EnterVol";
import  EnterCom  from "./EnterCom";

export default function App({ Component, pageProps }: AppProps) {
  return <><SignVol/>
  <SignCom/>
  <EnterCom/>
  <EnterVol/>
  </>

}
