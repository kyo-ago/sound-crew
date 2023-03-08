import { atom } from "recoil";

const soundSets = [
  {
    name: "太鼓",
    key: "drum-japanese2",
  },
  {
    name: "拍手",
    key: "people-performance-cheer1",
  },
] as const;

const messageToKey = {
  太鼓: "drum-japanese2",
  "👏👏👏": "people-performance-cheer1",
} as { [key: string]: string };

let soundPlaying = false;

export class SoundContext {
  private constructor(
    private readonly audioContext: AudioContext,
    private readonly mediaStreamAudioDestinationNode: MediaStreamAudioDestinationNode,
    private readonly mediaStream: MediaStream,
    private readonly gainNode: GainNode,
    private readonly audioBuffers: { [key: string]: AudioBuffer }
  ) {}
  static create() {
    const audioContext = new AudioContext();
    const mediaStreamAudioDestinationNode =
      audioContext.createMediaStreamDestination();
    const mediaStream = mediaStreamAudioDestinationNode.stream;
    const gainNode = audioContext.createGain();
    gainNode.connect(mediaStreamAudioDestinationNode);

    return this.loadAllAudioBuffer(audioContext).then(
      (audioBuffers) =>
        new SoundContext(
          audioContext,
          mediaStreamAudioDestinationNode,
          mediaStream,
          gainNode,
          audioBuffers
        )
    );
  }
  static async loadAllAudioBuffer(audioContext: AudioContext) {
    return Promise.all(
      soundSets.map((sound) =>
        fetch(`/sounds/${sound.key}.mp3`)
          .then((res) => res.blob())
          .then((res) => res.arrayBuffer())
          .then((res) => audioContext.decodeAudioData(res))
          .then((res) => [sound.key, res] as const)
      )
    ).then((res) =>
      res.reduce<{ [key: string]: AudioBuffer }>(
        (prev, cur) => ({
          [cur[0]]: cur[1],
          ...prev,
        }),
        {}
      )
    );
  }
  async fakeUserMedia(constraints?: MediaStreamConstraints) {
    if (constraints?.audio) {
      return this.mediaStream;
    }
    return new MediaStream();
  }
  mapSounds<T>(callback: (key: string, name: string) => T) {
    return soundSets.map(({ key, name }) => callback(key, name));
  }
  setVolume(volume: number) {
    this.gainNode.gain.value = volume;
  }
  playSound(key: string) {
    if (soundPlaying) {
      return;
    }
    soundPlaying = true;
    const audioBufferSourceNode = this.audioContext.createBufferSource();
    audioBufferSourceNode.buffer = this.audioBuffers[key];
    audioBufferSourceNode.connect(this.gainNode);
    audioBufferSourceNode.start();
    audioBufferSourceNode.addEventListener("ended", () => {
      audioBufferSourceNode.disconnect();
      setTimeout(() => {
        soundPlaying = false;
      }, 2000);
    });
  }
  playMessageSound(key: string) {
    const [, volume] = key.match(/音量.*?(\d+)/) || [];
    if (volume) {
      this.setVolume(Number(volume) / 100);
      return;
    }
    const k = key.replace(/^(.)\1{2,}$/u, "$1$1$1");
    messageToKey[k] && this.playSound(messageToKey[k]);
  }
  playScreenShareSound() {
    this.playSound("drum-japanese2");
  }
}

export const soundContextState = atom({
  key: "SoundContext",
  default: SoundContext.create(),
});
