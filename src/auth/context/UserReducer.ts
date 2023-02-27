import { User, UserContextType } from "./UserContext";

export const userReducer = (userContext: UserContextType, action: UserAction): UserContextType => {
   switch (action.type) {
      case "login":
         return {
            ...userContext,
            logged: true,
            user: action.payload,
         };
      case "logout":
         return {
            ...userContext,
            logged: false,
            user: action.payload,
         };
      default:
         return { ...userContext };
   }
};

export interface UserAction {
   type: "login" | "logout";
   payload: User;
}
