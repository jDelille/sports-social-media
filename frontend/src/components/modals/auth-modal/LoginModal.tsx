import React, { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useLoginModal from "../../../hooks/useLoginModal";
import { useNavigate } from "react-router-dom";
import Input from "../../input/Input";
import useRegisterModal from "../../../hooks/useRegisterModal";
import Modal from "../modal/Modal";
import "./authModal.scss";

type LoginProps = {};
const Login: React.FC<LoginProps> = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<any | null>(null);
  const { login } = useContext(AuthContext);
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  const registerModal = useRegisterModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await login(inputs);
      loginModal.onClose();
      navigate("/home");
      setError(null);
      setInputs({
        username: "",
        password: "",
      });
    } catch (error: any) {
      setError(error.response.data);
      console.log(error);
    }
  };

  const handleClose = () => {
    loginModal.onClose();
    setError(null);
    setInputs({
      username: "",
      password: "",
    });
  };

  const handleOpenRegister = () => {
    handleClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className="login">
      {error && <div className="error">{error}</div>}

      <form>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder={"Enter your username"}
          label="Username"
          onChange={(e) => handleChange(e)}
        />

        <Input
          type="password"
          name="password"
          id="password"
          placeholder={"Enter your password"}
          label="Password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handleLogin} className="auth-btn">
          Login
        </button>
        <span className="redirect">
          Don't have an account?{" "}
          <button onClick={handleOpenRegister}>Sign up</button>
        </span>
      </form>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      isOpen={loginModal.isOpen}
      title={"Login"}
      onClose={handleClose}
    />
  );
};

export default Login;
