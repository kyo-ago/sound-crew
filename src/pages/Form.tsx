import React, { useState } from "react";
import styles from "./index.module.css";
import { signOut } from "next-auth/react";
import { ZoomMtgParams } from "./index";

export const Form = ({
  onJoin,
}: {
  onJoin: (props: ZoomMtgParams) => void;
}) => {
  const [userName, setUserName] = useState("sound crew");
  const [userRole, setUserRole] = useState("0");
  const [meetingNumber, setMeetingNumberState] = useState("");
  const [password, setPassword] = useState("");
  const setMeetingNumber = (value: string) => {
    try {
      const url = new URL(value);
      setMeetingNumberState(url.pathname.replace(/\D/g, ""));
      setPassword(url.searchParams.get("pwd") || password);
    } catch {
      setMeetingNumberState(value.replace(/\D/g, ""));
    }
  };

  const buttonEnabled = !!userName && !!userRole && !!meetingNumber;

  return (
    <div className="App">
      <main className={styles.main}>
        <h1>Zoom Meeting SDK Sample React</h1>
        <div>
          Name{" "}
          <input
            value={userName}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          Role{" "}
          <select
            value={userRole}
            onChange={({ target }) => setUserRole(target.value)}
          >
            <option value="0">Attendee</option>
            <option value="1">Host</option>
          </select>
        </div>
        <div>
          Meeting Number (or Meeting URL)
          <input
            value={meetingNumber}
            onChange={({ target }) => setMeetingNumber(target.value)}
          />
        </div>
        <div>
          Meeting Password{" "}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className={styles.button} onClick={() => signOut()}>
          SignOut
        </button>{" "}
        <button
          className={styles.button}
          onClick={() =>
            onJoin({
              userName,
              userRole,
              meetingNumber,
              password,
            })
          }
          disabled={!buttonEnabled}
        >
          Join Meeting
        </button>
      </main>
    </div>
  );
};
