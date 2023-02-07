import React from "react";
import dynamic from "next/dynamic";
import { signIn, useSession } from "next-auth/react";

const IndexApp = dynamic(() => import("../src/pages/index"), {
  ssr: false,
});

export default function IndexPage() {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Hang on there...</p>;
  }

  if (status === "authenticated") {
    return (
      <>
        <IndexApp />
      </>
    );
  }

  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
