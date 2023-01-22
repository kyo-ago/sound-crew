import { Meeting } from "./Meeting";
import { ZoomMtgParams } from "./index";
import { useInitializeZoom } from "../hooks/useInitializeZoom";

export const JoinMeeting = ({
  userName,
  userRole,
  meetingNumber,
  passwords,
}: ZoomMtgParams) => {
  const { data } = useInitializeZoom({
    meetingNumber,
    userRole,
  });

  if (data) {
    return (
      <Meeting
        userName={userName}
        passwords={passwords}
        meetingNumber={meetingNumber}
        signature={data.signature}
      />
    );
  }
  return <div>start</div>;
};
