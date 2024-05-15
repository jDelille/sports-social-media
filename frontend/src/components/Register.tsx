import axios from "axios";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { APP_CONSTANTS } from "../constants";

type RegisterProps = {};
const Register: React.FC<RegisterProps> = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<any | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${APP_CONSTANTS.API_BASE_URL}/auth/register`, inputs);
    } catch (error: any) {
      setError(error.response.data);
    }
  };
  return (
    <div className="register">
      <form>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="enter name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="enter username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="enter email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="enter password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handleClick}>Create account</button>
      </form>
    </div>
  );
};

export default Register;
