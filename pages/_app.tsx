import "../src/styles/globals.css";
import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Head>
          <title>sound crew</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
