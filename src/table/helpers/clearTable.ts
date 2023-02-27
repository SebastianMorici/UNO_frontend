import axios from "axios";
export const clearTable = async (tableId: number) => {
   const { REACT_APP_API_URL } = process.env;
   const response = await axios.post(`${REACT_APP_API_URL}/uno_tables/${tableId}/clear`, {
      headers: { "Content-type": "application/json; charset=UTF-8" },
   });

   console.log("cleared");
   
};