import React from "react";
import Popup from "./Popup";
import { useAccountCreated } from "../../hooks";
import "./accountCreated.scss";
import { PartyIcon } from "../../icons";

type AccountCreatedProps = {};
const AccountCreated: React.FC<AccountCreatedProps> = () => {
  const accountCreatedPopup = useAccountCreated();

  const bodyContent = (
    <div className="popup-content">
      <PartyIcon size={40} color="black" />

      <h1>Account created!</h1>
      <p>
        Your account has been created. You're all set to customize your profile,
        connect with other sports fans, and post your bets.
      </p>
      <button onClick={accountCreatedPopup.onClose}>Continue</button>
    </div>
  );
  return (
    <Popup
      body={bodyContent}
      isOpen={accountCreatedPopup.isOpen}
      onClose={accountCreatedPopup.onClose}
      hideHeader
    />
  );
};

export default AccountCreated;
