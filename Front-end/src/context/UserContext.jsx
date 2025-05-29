import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserLogin(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user"); // remove do localStorage
    setUserLogin(null); // limpa o estado
  };

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
