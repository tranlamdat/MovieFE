import { useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";
import swalService from "../../services/SwalService";
import { ROLE } from "../../utils/constant";

const AdminProtected = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isAdmin = () => {
    return authService.getUserRole() === ROLE.ADMIN;
  };

  if (isAuthenticated() && isAdmin()) {
    return children;
  }

  swalService.showMessageToHandle(
    "Warning",
    "You are not authorized to access this page",
    "warning",
    () => navigate("/")
  );
};

export default AdminProtected;
