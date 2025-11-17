import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const [token, setTokenState] = useState(getToken());

  const setToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setTokenState(userToken);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setTokenState(null);
  };

  return { token, setToken, clearToken };
}
