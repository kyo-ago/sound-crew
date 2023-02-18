import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <div id="meetingSDKElement"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
