import axios from "axios";
export const refresh = async (tableId: number): Promise<any> => {
   const { REACT_APP_API_URL } = process.env;
   const unoTableResponse = await axios.get(`${REACT_APP_API_URL}/uno_tables/${tableId}/refresh`);

   console.log("refreshing");
   

   const player_one = unoTableResponse.data.playerOne;
   const player_two = unoTableResponse.data.playerTwo;
   const player_three = unoTableResponse.data.playerThree;

   const player_one_deck = unoTableResponse.data.playerOne.deck;
   const player_two_deck = unoTableResponse.data.playerTwo.deck;
   const player_three_deck = unoTableResponse.data.playerThree.deck;

   const played_cards = unoTableResponse.data.playedCards;
   const played_card = played_cards[played_cards.length - 1];

   const next_turn = unoTableResponse.data.turn;
   const current_color = unoTableResponse.data.currentColor;
   const winner = unoTableResponse.data.winner;

   return [player_one_deck, player_two_deck, player_three_deck, played_card, next_turn, current_color, winner];
};
