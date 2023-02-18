import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>sound crew</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
