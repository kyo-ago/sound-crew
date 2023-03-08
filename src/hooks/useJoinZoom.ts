import { useMount } from "./useMount";
import { zoomClientState, ZoomJoinParams } from "../libs/zoomClient";
import { zoomUiObserver } from "../libs/zoomUiObserver";
import { useRecoilValue } from "recoil";
import { soundContextState } from "../libs/soundContext";
import { useSession } from "next-auth/react";

export const useJoinZoom = (zoomJoinParams: ZoomJoinParams) => {
  const soundContext = useRecoilValue(soundContextState);
  const zoomClient = useRecoilValue(zoomClientState);
  const session = useSession<true>();
  useMount(() => {
    zoomClient.join(zoomJoinParams, session.data?.user! as any).then(() => {
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
