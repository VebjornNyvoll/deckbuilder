import { useContext, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

interface Props {
  children: ReactElement;
}

export default function RequireAuth({ children }: Props): ReactElement {
    const {user} = useContext(AuthContext);

    if (!user || user === null) {
        return <Navigate to="/login" />;
    }

  return children;
}
