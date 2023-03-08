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
      <input
        type="range"
        min="0"
        max="100"
        value="100"
        onClick={(e) => {
          soundContext.setVolume(e.currentTarget.valueAsNumber / 100);
        }}
      />
    </>
  );
};
