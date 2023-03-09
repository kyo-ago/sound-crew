import { useJoinZoom } from "../hooks/useJoinZoom";
import { ZoomJoinParams } from "../libs/zoomClient";
import { useRecoilValue } from "recoil";
import { soundContextState } from "../libs/soundContext";
import { useState } from "react";

export const Meeting = (zoomJoinParams: ZoomJoinParams) => {
  const soundContext = useRecoilValue(soundContextState);
  useJoinZoom(zoomJoinParams);
  const [volume, setVolumeState] = useState(100);
  const setVolume = (newVolume: string | number) => {
    soundContext.setVolume(Number(newVolume) / 100);
    setVolumeState(Number(newVolume));
  };
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
        value={volume}
        onChange={(e) => {
          setVolume(e.currentTarget.valueAsNumber);
        }}
      />
    </>
  );
};
