import { useMount } from "./useMount";
import { zoomClientState, ZoomJoinParams } from "../libs/zoomClient";
import { zoomUiObserver } from "../libs/zoomUiObserver";
import { useRecoilValue } from "recoil";
import { soundContextState } from "../libs/soundContext";

export const useJoinZoom = (zoomJoinParams: ZoomJoinParams) => {
  const soundContext = useRecoilValue(soundContextState);
  const zoomClient = useRecoilValue(zoomClientState);
  useMount(() => {
    zoomClient.join(zoomJoinParams).then(() => {
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
