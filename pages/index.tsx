import React from "react";
import dynamic from "next/dynamic";

const IndexApp = dynamic(() => import("../src/pages/index"), {
  ssr: false,
});

export default function IndexPage() {
  return <IndexApp />;
}
