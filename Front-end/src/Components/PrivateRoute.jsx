import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userLogin } = useUser();

  return userLogin ? children : <Navigate to="/" />;
};

export default PrivateRoute;
