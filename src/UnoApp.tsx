import { UserProvider } from "./auth/context/UserProvider";
import { AppRouter } from "./router/AppRouter";

export const UnoApp = () => {
   return (
      <UserProvider>
         <AppRouter />
      </UserProvider>
   );
};
