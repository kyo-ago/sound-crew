import { Meeting } from "./Meeting";
import { ZoomMtgParams } from "./index";
import { useInitializeZoom } from "../hooks/useInitializeZoom";
import {AbsoluteCenter, CircularProgress} from "@chakra-ui/react";
import React from "react";

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

  if (!data) {
    return <AbsoluteCenter><CircularProgress isIndeterminate /></AbsoluteCenter>;
  }

  return (
    <Meeting
      {...{
        userName,
        password,
        meetingNumber,
      }}
      signature={data.signature}
    />
  );
};
