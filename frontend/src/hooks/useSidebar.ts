import useLoginModal from "./useLoginModal";
import useRegisterModal from "./useRegisterModal";
import useCreatePostModal from "./useCreatePostModal";
import { useAuth } from "../context/AuthContext";

const useSidebar = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const createPostModal = useCreatePostModal();

  const {logout} = useAuth();

  const handleOpenLogin = () => {
    loginModal.onOpen();
  };

  const handleOpenSignup = () => {
    registerModal.onOpen();
  };

  const handleOpenCreatePost = () => {
    createPostModal.onOpen();
  };

  const handleLogout = () => {
    logout();
  };

  return {
    handleOpenLogin,
    handleOpenSignup,
    handleOpenCreatePost,
    handleLogout,
  };
};

export default useSidebar;