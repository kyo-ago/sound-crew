import useSWRMutation from "swr/mutation";
import { useRecoilValue } from "recoil";
import { useMount } from "./useMount";
import { zoomClientState } from "../libs/zoomClient";
import { z } from "zod";

const ApiResponse = z.object({
  signature: z.string(),
});

const signatureEndpoint = "/api";
async function sendRequest(url: string, { arg }: any) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  })
    .then((res) => res.json())
    .then((json) => ApiResponse.parse(json));
}

export const useInitializeZoom = ({
  meetingNumber,
  userRole,
}: {
  meetingNumber: string;
  userRole: string;
}) => {
  const { trigger, data } = useSWRMutation(signatureEndpoint, sendRequest);

  const zoomClient = useRecoilValue(zoomClientState);

  useMount(() => {
    trigger({
      meetingNumber: meetingNumber,
      role: userRole,
    }).then();
    zoomClient.initialize().then();
  });

  return { data };
};
