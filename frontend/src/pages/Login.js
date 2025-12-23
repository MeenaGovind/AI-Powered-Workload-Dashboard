
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <button className="bg-blue-500 px-6 py-3 rounded" onClick={() => signInWithPopup(auth, provider)}>
        Login with Google
      </button>
    </div>
  );
}
