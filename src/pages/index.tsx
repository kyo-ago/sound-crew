import React, {Suspense, useState} from "react";
import {RecoilRoot, useRecoilValue} from "recoil";
import {signIn, useSession} from "next-auth/react";
import {Form} from "./Form";
import {JoinMeeting} from "./JoinMeeting";
import {useMount} from "../hooks/useMount";
import {soundContextState} from "../libs/soundContext";
import {Loading} from "./components/Loading";

export type ZoomMtgParams = {
  userName: string;
  userRole: string;
  meetingNumber: string;
  password: string;
};

const Home = () => {
  const { status } = useSession();
  const [joinParams, setJoinParams] = useState<ZoomMtgParams | undefined>();
  const soundContext = useRecoilValue(soundContextState);

  useMount(() => {
    navigator.mediaDevices.getUserMedia =
      soundContext.fakeUserMedia.bind(soundContext);
  });

  if (status === "loading") {
    return <Loading />;
  }

  if (status !== "authenticated") {
    signIn();
    return null;
  }

  if (joinParams) {
    return <JoinMeeting {...joinParams} />;
  }

  return <Form onJoin={setJoinParams} />;
};

export default function Index() {
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </RecoilRoot>
  );
}
