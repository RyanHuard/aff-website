import { auth } from "@/firebase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthTokenContext = createContext("");

function AuthTokenProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      setAuthToken((await user?.getIdToken()) ?? "");
    });
  }, []);

  return (
    <AuthTokenContext.Provider value={authToken}>
      {children}
    </AuthTokenContext.Provider>
  );
}

export function useAuthToken() {
  return useContext(AuthTokenContext);
}

export default AuthTokenProvider;
