import React, { useState } from "react";
import styles from "./index.module.css";

export const Form = ({
  onJoin,
}: {
  onJoin: (props: {
    userName: string;
    userRole: string;
    meetingNumber: string;
    passwords: string;
  }) => void;
}) => {
  const [userName, setUserName] = useState("sound crew");
  const [userRole, setUserRole] = useState("0");
  const [meetingNumber, setMeetingNumber] = useState("7445166963");
  const [passwords, setPasswords] = useState("");

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
          Role
          <select
            value={userRole}
            onChange={({ target }) => setUserRole(target.value)}
          >
            <option value="0">Attendee</option>
            <option value="1">Host</option>
          </select>
        </div>
        <div>
          Meeting Number{" "}
          <input
            value={meetingNumber}
            onChange={({ target }) => setMeetingNumber(target.value)}
          />
        </div>
        <div>
          Meeting Passwords{" "}
          <input
            value={passwords}
            onChange={({ target }) => setPasswords(target.value)}
          />
        </div>
        <button
          className={styles.button}
          onClick={() =>
            onJoin({
              userName,
              userRole,
              meetingNumber,
              passwords,
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
