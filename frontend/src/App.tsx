import { useEffect, useState } from "react";
import { useAxios } from "./hooks/useAxios";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState<any>(null);
  const [body, setBody] = useState("Testing body from react");

  const userId = 1;

  useEffect(() => {
    const fetchUser = async () => {
      await useAxios.get("users/find/" + userId).then((res) => {
        return setUser(res.data);
      });
    };

    fetchUser();
  }, [userId]);

  console.log(user);

  const postData = {
    body,
  };

  const createPost = async () => {
    return useAxios.post("/posts", postData);
  };

  return (
    <>
      <AuthProvider>
        <button onClick={createPost}>Create post</button>
        <Login />
        <Register />
      </AuthProvider>
    </>
  );
}

export default App;
