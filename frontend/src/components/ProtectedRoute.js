
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../pages/Login";

export default function Protected({ children }) {
  const [user] = useAuthState(auth);
  return user ? children : <Login />;
}
