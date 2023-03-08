import { Meeting } from "./Meeting";
import { ZoomMtgParams } from "./index";
import { useInitializeZoom } from "../hooks/useInitializeZoom";

export const JoinMeeting = ({
  userName,
  userRole,
  meetingNumber,
  password,
}: ZoomMtgParams) => {
  const { data } = useInitializeZoom({
    meetingNumber,
    userRole,
  });

  if (data) {
    return (
      <Meeting
        {...{
          userName,
          password,
          meetingNumber,
        }}
        token={data.token}
        signature={data.signature}
      />
    );
  }
  return <div>start</div>;
};
