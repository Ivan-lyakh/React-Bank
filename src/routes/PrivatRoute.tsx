import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Loading } from "../components/Loading/Loading";

type Props = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const { loadingUser, user } = useUser();

  if (loadingUser) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};