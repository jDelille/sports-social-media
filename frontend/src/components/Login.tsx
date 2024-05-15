import React, { MouseEvent, useState } from "react";

type LoginProps = {};
const Login: React.FC<LoginProps> = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<any | null>(null);
  const { login } = useContext(AuthContext)


  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await login(inputs);
    //   handleNavigate('/')
    } catch (error: any) {
      setError(error.response.data);
      console.log(error)
    }
  };

  return <div className="login"></div>;
};

export default Login;
