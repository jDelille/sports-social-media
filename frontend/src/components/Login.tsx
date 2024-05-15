import React, { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type LoginProps = {};
const Login: React.FC<LoginProps> = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<any | null>(null);
  const { login } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await login(inputs);
      //   handleNavigate('/')
    } catch (error: any) {
      setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="login">
      <form>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="enter username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="enter password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
