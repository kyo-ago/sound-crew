import { useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";
import { useMount } from "./useMount";
import {
  UserSession,
  zoomClientState,
  ZoomJoinParams,
} from "../libs/zoomClient";
import { zoomUiObserver } from "../libs/zoomUiObserver";
import { soundContextState } from "../libs/soundContext";

export const useJoinZoom = (zoomJoinParams: ZoomJoinParams) => {
  const soundContext = useRecoilValue(soundContextState);
  const zoomClient = useRecoilValue(zoomClientState);
  const session = useSession<true>();
  const userSession = UserSession.parse(session.data?.user);
  useMount(() => {
    zoomClient.join(zoomJoinParams, userSession).then(() => {
      zoomClient.onChangeShareScreenStatus((data) => {
        if (data.action === "Start") {
          soundContext.playScreenShareSound();
        }
      });
    });
    zoomUiObserver((text) => {
      soundContext.playMessageSound(text);
    });
  });
};
