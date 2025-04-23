import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SignVol from "../components/Authorization/SignVol";
import SignCom from "../components/Authorization/SignCom";
import EnterVol from "../components/Authorization/EnterVol";
import EnterCom from "../components/Authorization/EnterCom";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SignVol />
      <SignCom />
      <EnterCom />
      <EnterVol />
    </>
  );
}
