import { useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";
import swalService from "../../services/SwalService";
import { ROLE } from "../../utils/constant";

const MemberProtected = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isMember = () => {
    return authService.getUserRole() === ROLE.MEMBER;
  };

  if (isAuthenticated() && isMember()) {
    return children;
  }

  swalService.showMessageToHandle(
    "Warning",
    "You are not authorized to access this page",
    "warning",
    () => navigate("/")
  );
};

export default MemberProtected;
