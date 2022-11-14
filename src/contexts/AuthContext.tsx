import { createContext, ReactElement, useState } from "react";

interface IUser {
  id: string;
  avatar: string;
  name: string;
}
interface IProps {
  user: IUser;
  setNewUser: (values: IUser) => void;
}
export const AuthContext = createContext<IProps>({} as IProps);

interface IContext {
  children: ReactElement;
}

export default function AuthContextProvider({ children }: IContext) {
  const [user, setUser] = useState({ id: "", avatar: "", name: "" });

  function setNewUser(values: IUser) {
    setUser(values);
  }
  return (
    <AuthContext.Provider value={{ user, setNewUser }}>
      {children}
    </AuthContext.Provider>
  );
}