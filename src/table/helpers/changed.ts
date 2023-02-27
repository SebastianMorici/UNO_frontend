import axios from "axios";
export const changed = async (tableId: number, decksSize: number[]) => {
   const { REACT_APP_API_URL } = process.env;
   const response = await axios.post(`${REACT_APP_API_URL}/uno_tables/${tableId}/changed`, JSON.stringify({ decksSize }), {
      headers: { "Content-type": "application/json; charset=UTF-8" },
   });

   return response.data.changed;
};
