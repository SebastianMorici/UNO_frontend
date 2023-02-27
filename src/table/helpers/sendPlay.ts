import axios from "axios";
import { CardType } from '../pages/TablePage';
export const sendPlay = async (tableId: number, playerId: number, card: CardType) => {
   const { REACT_APP_API_URL } = process.env;
   
   
   if (card.color === "BLACK") {
      let color: string;
      const colorPicked = window.prompt("Pick a color: r: RED - b: BLUE - g: GREEN - y: YELLOW -- default: RED");
      switch (colorPicked?.toLowerCase()) {
         case "r":
            color = "RED";
            break;
         case "b":
            color = "BLUE";
            break;
         case "g":
            color = "GREEN";
            break;
         case "y":
            color = "YELLOW";
            break;
         default:
            color = "RED";
            break;
      }
      const unoTableResponse = await axios.post(`${REACT_APP_API_URL}/uno_tables/${tableId}/play`, JSON.stringify({ playerId: playerId, card: card, color: color}), {
         headers: { "Content-type": "application/json; charset=UTF-8" },
      });

   } else {
      const unoTableResponse = await axios.post(`${REACT_APP_API_URL}/uno_tables/${tableId}/play`, JSON.stringify({ playerId: playerId, card: card}), {
         headers: { "Content-type": "application/json; charset=UTF-8" },
      });
   }
   

   

   // const player_one = unoTableResponse.data.playerOne;
   // const player_two = unoTableResponse.data.playerTwo;
   // const player_three = unoTableResponse.data.playerThree;

   // const player_one_deck = unoTableResponse.data.playerOne.deck;
   // const player_two_deck = unoTableResponse.data.playerTwo.deck;
   // const player_three_deck = unoTableResponse.data.playerThree.deck;

   // const played_cards = unoTableResponse.data.playedCards;
   // const played_card = played_cards[played_cards.length - 1]

   // const first_turn = unoTableResponse.data.turn;
   // const current_color = unoTableResponse.data.currentColor

   // return [player_one, player_two, player_three, player_one_deck, player_two_deck, player_three_deck, played_card, first_turn, current_color];
};
