import { useEffect, useState } from "react";
import { useAxios } from "./hooks/useAxios";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import useLoginModal from "./hooks/useLoginModal";
import useRegisterModal from "./hooks/useRegisterModal";

function App() {
  const [user, setUser] = useState<any>(null);
  const [body, setBody] = useState("Testing body from react");
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();



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
        <button onClick={loginModal.onOpen}>Login</button>
        <button onClick={registerModal.onOpen}>Register</button>
        <Login />
        <Register />
      </AuthProvider>
    </>
  );
}

export default App;
