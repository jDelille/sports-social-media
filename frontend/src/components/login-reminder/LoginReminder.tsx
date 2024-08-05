import React from "react";
import Popup from "../popup/Popup";
import { useLoginReminder } from "../../hooks";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import "./loginReminder.scss";

type LoginReminderProps = {};

const LoginReminder: React.FC<LoginReminderProps> = () => {
  const loginReminder = useLoginReminder();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const icon = loginReminder.icon;
  const text = loginReminder.text;
  const subText = loginReminder.subText;

  const handleClose = () => {
    loginReminder.onClose();
  };

  const handleLogin = () => {
    handleClose();
    loginModal.onOpen();
  };

  const handleSignup = () => {
    handleClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className="login-reminder-body">
      <div className="icon">{icon}</div>
      <div className="content">
        <h1>{text}</h1>

        <span>{subText}</span>
        <ul>
          <li>
            <button onClick={handleLogin}>Log in</button>
          </li>
          <li>
            <button onClick={handleSignup}>Sign up</button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="login-reminder">
      <Popup
        body={bodyContent}
        isOpen={loginReminder.isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default LoginReminder;
