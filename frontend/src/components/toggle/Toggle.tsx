import React from "react";
import "./toggle.scss";
import { CheckMarkIcon } from "../../icons";

type ToggleProps = {
  isToggled: boolean;
  handleToggle: () => void;
};

const Toggle: React.FC<ToggleProps> = ({ isToggled, handleToggle }) => {
  return (
    <div
      className={isToggled ? "selected-toggle" : "toggle"}
      onClick={handleToggle}
    >
      <CheckMarkIcon size={18} color="white" />
    </div>
  );
};

export default Toggle;
