// import { Loading } from "../components/Loading";
// import { UserContext } from "../../auth/context/UserContext";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const HomePage = () => {
//    const { user } = useContext(UserContext);
//    const navigate = useNavigate();
//    const [loading, setLoading] = useState<boolean>(false);

//    let full: boolean = false;

//    const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay)); // Para usar un timeout dentro de "async"

//    const handleSearchGame = async () => {
//       try {
//       } catch (e: any) {
//          alert(e.response.data.message);
//       }
//    };
//    return (
//       <div className="search_container">
//          <button
//             className="search_button animate__animated animate__slideInLeft"
//             onClick={handleSearchGame}
//             style={{ display: loading ? "none" : "" }}
//          >
//             Search Game
//          </button>
//          {loading && <Loading loading={Loading} />}
//       </div>
//    );
// };

import { useContext, useState } from "react";
import { UserContext } from "../../auth/context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const HomePage = () => {
   const { REACT_APP_API_URL } = process.env;
   const { user } = useContext(UserContext);
   const navigate = useNavigate();
   const [loading, setLoading] = useState<boolean>(false);

   let full: boolean = false;

   const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay)); // Para usar un timeout dentro de una funcion "async"

   const handleSearchGame = async () => {
      try {
         setLoading(true);
         const response = await axios.post(`${REACT_APP_API_URL}/players/${user.id}/search_game`);
         
         // const tableId: number = response.data.board.id; // -> RAILS
         const tableId: number = response.data.id; // -> SPRING

         // full = response.data.board.full; // -> RAILS
         full = response.data.full;  // -> SPRING

         while (!full) {
            const response = await axios.get(`${REACT_APP_API_URL}/uno_tables/${tableId}/refresh`);
            // full = response.data.board.full; // -> RAILS
            full = response.data.full; // -> SPRING
            await wait(3000);
         }
         navigate("/table", { state: tableId });
         setLoading(false);
      } catch (e: any) {
         alert(e.response.data.message);
      }
   };

   return (
      <div className="search_container">
         <button
            className="search_button animate__animated animate__slideInLeft"
            onClick={handleSearchGame}
            style={{ display: loading ? "none" : "" }}
         >
            Search Game
         </button>
         {loading && <Loading loading={loading} />}
      </div>
   );
};
