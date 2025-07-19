import { Navigate } from "react-router-dom";

import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role] = useRole(); 

  return role === "admin" ? children : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
