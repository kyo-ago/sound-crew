import { useJoinZoom } from "../hooks/useJoinZoom";
import { ZoomJoinParams } from "../libs/zoomClient";
import { useRecoilValue } from "recoil";
import { soundContextState } from "../libs/soundContext";

export const Meeting = (zoomJoinParams: ZoomJoinParams) => {
  const soundContext = useRecoilValue(soundContextState);
  useJoinZoom(zoomJoinParams);
  return (
    <>
      {soundContext.mapSounds((key, name) => (
        <button
          key={key}
          onClick={() => {
            soundContext.playSound(key);
          }}
        >
          {name}
        </button>
      ))}
    </>
  );
};
