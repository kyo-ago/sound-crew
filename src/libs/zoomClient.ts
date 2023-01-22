import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { atom } from "recoil";

export type ZoomJoinParams = {
  signature: string;
  meetingNumber: string;
  userName: string;
  passwords: string;
};

export class ZoomClient {
  constructor(private readonly client = ZoomMtgEmbedded.createClient()) {}
  initialize() {
    const meetingSDKElement =
      document.getElementById("meetingSDKElement") || undefined;
    return this.client.init({
      zoomAppRoot: meetingSDKElement || undefined,
      language: "en-US",
    });
  }
  join(zoomJoinParams: ZoomJoinParams) {
    const userEmail = "";
    const registrantToken = "";

    return new Promise((resolve, reject) => {
      // setTimeoutなしでclient.joinを呼ぶとReact.setStateが実行されておらず以下のエラーが出る
      // TypeError: s is not a function
      setTimeout(() => {
        this.client
          .join({
            ...zoomJoinParams,
            userEmail: userEmail,
            tk: registrantToken,
            sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
          })
          .then(resolve, reject);
      });
    });
  }
  onChangeShareScreenStatus(
    callback: (data: { userId: number; action: "Start" | "Stop" }) => void
  ) {
    this.client.on("peer-share-state-change", (data) => {
      callback(data as any);
    });
  }
}

export const zoomClientState = atom({
  key: "ZoomClient",
  default: new ZoomClient(),
});
