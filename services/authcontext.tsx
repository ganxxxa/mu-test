import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.on("login", (user: any) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
    });

    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = { user, login, logout };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
