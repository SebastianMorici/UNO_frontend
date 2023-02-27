import axios from "axios";
export const initialize = async (tableId: number) => {
   const { REACT_APP_API_URL } = process.env;
   const unoTableResponse = await axios.post(`${REACT_APP_API_URL}/uno_tables/${tableId}/initialize`, {
      headers: { "Content-type": "application/json; charset=UTF-8" },
   });

   console.log(unoTableResponse);
   

   const player_one = unoTableResponse.data.playerOne;
   const player_two = unoTableResponse.data.playerTwo;
   const player_three = unoTableResponse.data.playerThree;

   const player_one_deck = unoTableResponse.data.playerOne.deck;
   const player_two_deck = unoTableResponse.data.playerTwo.deck;
   const player_three_deck = unoTableResponse.data.playerThree.deck;

   const played_cards = unoTableResponse.data.playedCards;
   const played_card = played_cards[played_cards.length - 1]

   const first_turn = unoTableResponse.data.turn;
   const current_color = unoTableResponse.data.currentColor

   return [player_one, player_two, player_three, player_one_deck, player_two_deck, player_three_deck, played_card, first_turn, current_color];
};
