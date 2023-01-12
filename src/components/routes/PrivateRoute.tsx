import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: any;
  role?: boolean;
  profileIsActive: boolean;
}

export const PrivateRoute = ({
  children,
  role,
  profileIsActive,
}: PrivateRouteProps) => {
  if ((typeof role === "boolean" && !role) || !profileIsActive) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default PrivateRoute;
