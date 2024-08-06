import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "oidc-client";
import {
  getUser,
  login,
  logout,
} from "../services/AuthService";

interface UserClaims {
  sub: string;
  name: string;
  Est_Contremaitre: string;
  Est_Adjoint: string;
  Est_Dev: string;
  Est_DirecteurProjet: string;
  Est_ChargeProjet: string;
  email_verified: string;
  given_name: string;
  Est_PricerVetementAdmin: string;
  Est_Entrepot: string;
  idp: string;
  amr: string;
  auth_time: string;
  [key: string]: string;
}

interface AuthContextProps {
  user: User | null;
  claims: UserClaims | null;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  claims: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<UserClaims | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (!user) {
        login();
      } else {
        setUser(user);
        const claims = user.profile as unknown as UserClaims;
        setClaims(claims);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, claims, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
