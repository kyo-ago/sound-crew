import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { atom } from "recoil";
import { z } from "zod";

export const UserSession = z.object({
  email: z.string(),
  zakToken: z.string(),
});
type UserSessionType = z.infer<typeof UserSession>;

export type ZoomJoinParams = {
  signature: string;
  meetingNumber: string;
  userName: string;
  password: string;
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
  join(zoomJoinParams: ZoomJoinParams, user: UserSessionType) {
    return new Promise((resolve, reject) => {
      // setTimeoutなしでclient.joinを呼ぶとReact.setStateが実行されておらず以下のエラーが出る
      // TypeError: s is not a function
      setTimeout(() => {
        this.client
          .join({
            ...zoomJoinParams,
            userEmail: user.email,
            zak: user.zakToken,
            sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID,
          })
          .then(resolve, reject);
      }, 500);
    });
  }
  onMeetingEnd(callback: () => void) {
    this.client.on("connection-change", (payload) => {
      if (payload.state === "Closed") {
        callback();
      }
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
