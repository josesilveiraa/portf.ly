import { createContext, ReactNode, useState } from "react";
import { api } from "@/api/api";
import { setCookie } from 'nookies';
import { useRouter } from "next/router";

type User = {
  email: string;
  subId: number;
}

type AuthContextData = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>
  user: User | null;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInData) {
    const { data } = await api.post('auth/login', { email, password });
    const { user, access_token } = data;

    setCookie(undefined, 'portfly.token', access_token, {
      maxAge: 60 * 60 * 1 // 1 hour
    });

    setUser(user);

    router.push('/admin/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}