import { createContext } from "react";

export const UserContext = createContext<UserContextType>({} as UserContextType);

export type UserContextType = {
   user: User;
   logged: boolean;
   login?: (name: string) => Promise<void>;
   logout?: () => void;
}

export interface User {
   id: number;
   name: string;
}