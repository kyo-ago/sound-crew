import useSWRMutation from "swr/mutation";
import { useRecoilValue } from "recoil";
import { useMount } from "./useMount";
import { zoomClientState } from "../libs/zoomClient";

const signatureEndpoint = "/api";
async function sendRequest<Response>(url: string, { arg }: any) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  }).then((res) => res.json() as Response);
}

export const useInitializeZoom = ({
  meetingNumber,
  userRole,
}: {
  meetingNumber: string;
  userRole: string;
}) => {
  const { trigger, data } = useSWRMutation<{
    signature: string;
  }>(signatureEndpoint, sendRequest);

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
