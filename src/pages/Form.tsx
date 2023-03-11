import React, { useReducer } from "react";
import { signOut } from "next-auth/react";
import styles from "./index.module.css";
import { ZoomMtgParams } from "./index";

export const Form = ({
  onJoin,
}: {
  onJoin: (props: ZoomMtgParams) => void;
}) => {
  const [zoomMtgParams, updateZoomMtgParams] = useReducer(
    (prev: Partial<ZoomMtgParams>, next: Partial<ZoomMtgParams>) => {
      const newParams = { ...prev, ...next };
      if (newParams.meetingNumber) {
        try {
          const url = new URL(newParams.meetingNumber);
          newParams.meetingNumber = url.pathname.replace(/\D/g, "");
          newParams.password = url.searchParams.get("pwd") || "";
        } catch {}
      }
      localStorage.setItem("userName", newParams.userName || "");
      localStorage.setItem("userRole", newParams.userRole || "");
      localStorage.setItem("meetingNumber", newParams.meetingNumber || "");
      localStorage.setItem("password", newParams.password || "");
      return newParams;
    },
    {
      userName: localStorage.getItem("userName") || "sound crew",
      userRole: localStorage.getItem("userRole") || "0",
      meetingNumber: localStorage.getItem("meetingNumber") || "",
      password: localStorage.getItem("password") || "",
    }
  );

  const buttonEnabled =
    !!zoomMtgParams.userName &&
    !!zoomMtgParams.userRole &&
    !!zoomMtgParams.meetingNumber;

  return (
    <div className="App">
      <main className={styles.main}>
        <h1>Zoom Meeting SDK Sample React</h1>
        <div>
          Name{" "}
          <input
            value={zoomMtgParams.userName}
            onChange={({ target }) =>
              updateZoomMtgParams({ userName: target.value })
            }
          />
        </div>
        <div>
          Role{" "}
          <select
            value={zoomMtgParams.userRole}
            onChange={({ target }) =>
              updateZoomMtgParams({ userRole: target.value })
            }
          >
            <option value="0">Attendee</option>
            <option value="1">Host</option>
          </select>
        </div>
        <div>
          Meeting Number (or Meeting URL)
          <input
            value={zoomMtgParams.meetingNumber}
            onChange={({ target }) =>
              updateZoomMtgParams({ meetingNumber: target.value })
            }
          />
        </div>
        <div>
          Meeting Password{" "}
          <input
            value={zoomMtgParams.password}
            onChange={({ target }) =>
              updateZoomMtgParams({ password: target.value })
            }
          />
        </div>
        <button className={styles.button} onClick={() => signOut()}>
          SignOut
        </button>{" "}
        <button
          className={styles.button}
          onClick={() => onJoin(zoomMtgParams as ZoomMtgParams)}
          disabled={!buttonEnabled}
        >
          Join Meeting
        </button>
      </main>
    </div>
  );
};
