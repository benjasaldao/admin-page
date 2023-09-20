import { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@services/api/";
import parseJwt from "../utils/parseJWT";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      api: API_KEY,
    },
  };

  const checkCookies = async () => {
    const token = Cookie.get("token");
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      axios.defaults.headers.api = API_KEY;
      const { sub } = parseJwt(token);
      const { data: user } = await axios.get(
        endPoints.users.getOneUser(sub),
        options
      );

      if (user) {
        delete user.password;
        delete user.recoveryToken;
        setUser(user);
        return true;
      } else {
        return false
      }
    }
  };

  const signIn = async (email, password) => {
    const { data: loginInfo } = await axios.post(
      endPoints.auth.login,
      { email, password },
      options
    );
    if (loginInfo) {
      const { token, user } = loginInfo;
      Cookie.set("token", token, { expires: 1 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      axios.defaults.headers.api = API_KEY;
      setUser(user);
    }
  };

  const logout = () => {
    Cookie.remove("token");
    setUser(null);
    delete axios.defaults.headers.Authorization;
    delete axios.defaults.headers.api;
    window.location.href = "/login";
  };

  return {
    user,
    signIn,
    logout,
    checkCookies,
  };
}
