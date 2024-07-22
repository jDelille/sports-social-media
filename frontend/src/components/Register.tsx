import axios from "axios";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { APP_CONSTANTS } from "../constants";
import Modal from "./modal/Modal";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import Input from "./input/Input";
import { useAccountCreated } from "../hooks";
import { AuthContext } from "../context/AuthContext";

type RegisterProps = {};
const Register: React.FC<RegisterProps> = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<any | null>(null);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const accountCreatedPopup = useAccountCreated();
  const { login } = React.useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${APP_CONSTANTS.API_BASE_URL}/auth/register`, inputs);
      registerModal.onClose();
      // loginModal.onOpen();
      accountCreatedPopup.onOpen();
      await login({ username: inputs.username, password: inputs.password });
      
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  const handleClose = () => {
    registerModal.onClose();
  };

  const bodyContent = (
    <div className="register">
      <form>
        <Input
          type="text"
          id="name"
          name="name"
          label="Your Name"
          placeholder="John Doe"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="text"
          id="username"
          name="username"
          label="Your username"
          description="May only contain A-Z, 0-9, and underscores"
          placeholder="username"
          onChange={(e) => handleChange(e)}
          isUsername
        />

        <Input
          type="password"
          id="password"
          name="password"
          label="Password"
          description=""
          placeholder="●●●●●●●●"
          onChange={(e) => handleChange(e)}
          isPassword
        />

        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          description="Provide your email for support, account recovery, and marketing updates."
          placeholder="you@youremail.com"
          onChange={(e) => handleChange(e)}
        />

        <button onClick={handleClick} className="submit-btn">
          Create account
        </button>
      </form>
    </div>
  );
  return (
    <Modal
      body={bodyContent}
      title="Account info"
      isOpen={registerModal.isOpen}
      onClose={handleClose}
    />
  );
};

export default Register;
