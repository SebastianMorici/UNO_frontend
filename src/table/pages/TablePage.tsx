import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../auth/context/UserContext";
import { initialize } from "../helpers/initialize";
import { Card } from "../components/Card";
import "../components/index.css";
import { changed } from '../helpers/changed';
import { refresh } from "../helpers/refresh";
import { sendPlay } from '../helpers/sendPlay';
import { drawCard } from "../helpers/drawCard";
import { clearTable } from '../helpers/clearTable';

export const TablePage = () => {
   const {
      user: { id: playerId },
   } = useContext(UserContext);
   const { state: tableId } = useLocation();
   const [playerOne, setPlayerOne] = useState<PlayerType>();
   const [playerTwo, setPlayerTwo] = useState<PlayerType>();
   const [playerThree, setPlayerThree] = useState<PlayerType>();
   const [playerOneDeck, setPlayerOneDeck] = useState<CardType[]>([] as CardType[]);
   const [playerTwoDeck, setPlayerTwoDeck] = useState<CardType[]>([] as CardType[]);
   const [playerThreeDeck, setPlayerThreeDeck] = useState<CardType[]>([] as CardType[]);
   const [playedCard, setPlayedCard] = useState<CardType>();
   const [turn, setTurn] = useState<number>();
   const [currentColor, setCurrentColor] = useState<string>("");
   const [winner, setWinner] = useState<number | null>(null);

   // Inicializa todas las variables de la mesa
   useEffect(() => {
      const initializeTable = async () => {
         const [
            player_one,
            player_two,
            player_three,
            player_one_deck,
            player_two_deck,
            player_three_deck,
            played_card,
            first_turn,
            current_color,
         ] = await initialize(tableId as number);
         setPlayerOne(player_one);
         setPlayerTwo(player_two);
         setPlayerThree(player_three.name);
         setPlayerOneDeck(player_one_deck);
         setPlayerTwoDeck(player_two_deck);
         setPlayerThreeDeck(player_three_deck);
         setPlayedCard(played_card);
         setTurn(first_turn);
         setCurrentColor(current_color);
      };
      try {
         initializeTable();
      } catch (e: any) {
         console.log(e.response.data.message);
      }
   }, []);

         // Pregunta si ha cambiado algo al server, si es así, llama a refresh()
      const checkChanged = async () => {
         try {
            if (await changed(tableId, [playerOneDeck.length, playerTwoDeck.length, playerThreeDeck.length]) !== "false") {
               const [
                  player_one_deck,
                  player_two_deck,
                  player_three_deck,
                  played_card,
                  first_turn,
                  current_color,
                  winner
               ] = await refresh(tableId as number);
               setPlayerOneDeck(player_one_deck);
               setPlayerTwoDeck(player_two_deck);
               setPlayerThreeDeck(player_three_deck);
               setPlayedCard(played_card);
               setTurn(first_turn);
               setCurrentColor(current_color);
               setWinner(winner);
            }
         } catch (e: any) {
            console.log(e.response.data.message);
         }
      };

      // Llama a checkChanged cada 5 segundos
      useEffect(() => {
         const interval = setInterval(() => {
            checkChanged();
         }, 1000);
         if (winner !== null) clearInterval(interval);
         return () => {
            clearInterval(interval);
         };
      }, [playerOneDeck, playerTwoDeck, playerThreeDeck, winner]);

   const handleDrawClick = async (playerId: number) => {
      try {
         await drawCard(tableId as number, playerId);
      } catch (e: any) {
         console.log(e.response.data.message);
         
      }
   }

   const handleCardClick = async (playerId: number, card: CardType) => {
      try {
       await sendPlay(tableId as number, playerId, card);  
      } catch (e: any) {
         console.log(e.response.data.message);
      }
   }
   
   const handleTurn = () => {
      if (turn === playerOne?.id) return playerOne?.name;
      if (turn === playerTwo?.id) return playerTwo?.name;
      if (turn === playerThree?.id) return playerThree?.name;
   }


   return (
      <div className="table">
         <div className="deck deck_player3">
            {playerThreeDeck.map((card) => (
               <Card key={card?.id} color={card?.color?.toLowerCase()} value={card?.value?.toLowerCase()} onClick={() => handleCardClick(playerId, card)} />
            ))}
         </div>
         <div className="deck deck_player2">
            {playerTwoDeck.map((card) => (
               <Card key={card?.id} color={card?.color?.toLowerCase()} value={card?.value?.toLowerCase()} onClick={() => handleCardClick(playerId, card)} />
            ))}
         </div>
         <div className="deck deck_player1">
            {playerOneDeck.map((card) => (
               <Card key={card?.id} color={card?.color?.toLowerCase()} value={card?.value?.toLowerCase()} onClick={() => handleCardClick(playerId, card)} />
            ))}
         </div>
         <div className="deck deck_played">
            {<Card color={playedCard?.color?.toLowerCase()} value={playedCard?.value?.toLowerCase()} />}
         </div>
         <div className="deck deck_draw">
            <Card  onClick={() => handleDrawClick(playerId)} />
         </div>
         <div className={`color_circle ${currentColor.toLowerCase()}`} />
         <h3 className="turn">Turn: {handleTurn()} </h3>
      </div>
   );
};

export interface CardType {
   id?: number;
   color: string;
   value: string;
}

export interface PlayerType {
   id: number;
   name: string;
   deck: CardType[]
}
export interface UnoTable {}

// {Array.isArray(playerThreeDeck) && playerThreeDeck.map((card) => (


   // const handleCardClick = async (card: CardType, playerId: number) => {
   //    try {
   //       // const [
   //       //    player_one_deck,
   //       //    player_two_deck,
   //       //    player_three_deck,
   //       //    played_card,
   //       //    first_turn,
   //       //    current_color,
   //       //    winner,
   //       // ] = 
   //       await sendPlay(tableId as number, playerId, card);
   //       // setPlayerOneDeck(player_one_deck);
   //       // setPlayerTwoDeck(player_two_deck);
   //       // setPlayerThreeDeck(player_three_deck);
   //       // setPlayedCard(played_card);
   //       // setTurn(first_turn);
   //       // setCurrentColor(current_color);
   //       // setWinner(winner);
   //    } catch (e: any) {
   //       console.log(e.response.data.message);
   //    }
   // }

   // const handleDrawClick = async (playerId: number) => {
   //    try {
   //       // const [
   //       //    player_one_deck,
   //       //    player_two_deck,
   //       //    player_three_deck,
   //       //    played_card,
   //       //    first_turn,
   //       //    current_color,
   //       //    winner,
   //       // ] = 
   //       await drawCard(tableId as number, playerId);
   //       // setPlayerOneDeck(player_one_deck);
   //       // setPlayerTwoDeck(player_two_deck);
   //       // setPlayerThreeDeck(player_three_deck);
   //       // setPlayedCard(played_card);
   //       // setTurn(first_turn);
   //       // setCurrentColor(current_color);
   //       // setWinner(winner);
   //    } catch (e: any) {
   //       console.log(e.response.data.message);
         
   //    }
   // }


      // // Pregunta si ha cambiado algo al server, si es así, llama a refresh()
      // const checkChanged = async () => {
      //    try {
      //       if (await changed(tableId, [playerOneDeck.length, playerTwoDeck.length, playerThreeDeck.length])) {
      //          const [
      //             player_one_deck,
      //             player_two_deck,
      //             player_three_deck,
      //             played_card,
      //             first_turn,
      //             current_color,
      //             winner
      //          ] = await refresh(tableId as number);
      //          setPlayerOneDeck(player_one_deck);
      //          setPlayerTwoDeck(player_two_deck);
      //          setPlayerThreeDeck(player_three_deck);
      //          setPlayedCard(played_card);
      //          setTurn(first_turn);
      //          setCurrentColor(current_color);
      //          setWinner(winner);
      //       }
      //    } catch (e: any) {
      //       console.log(e.response.data.message);
      //    }
      // };
   
      // // Llama a checkChanged cada 5 segundos
      // useEffect(() => {
      //    const interval = setInterval(() => {
      //       checkChanged();
      //       console.log("hola");
            
            
      //    }, 5000);
      //    if (winner !== null) clearInterval(interval);
      //    return () => {
      //       clearInterval(interval);
      //    };
      // }, [checkChanged]);
   

      /* ANDA */
      // useEffect(() => {
      //    let interval = setInterval(() => {
      //       const checkChanged = async () => {
      //          if (await changed(tableId, [playerOneDeck.length, playerTwoDeck.length, playerThreeDeck.length])) {
      //             const [
      //                player_one_deck,
      //                player_two_deck,
      //                player_three_deck,
      //                played_card,
      //                first_turn,
      //                current_color,
      //                winner
      //             ] = await refresh(tableId as number);
      //             setPlayerOneDeck(player_one_deck);
      //             setPlayerTwoDeck(player_two_deck);
      //             setPlayerThreeDeck(player_three_deck);
      //             setPlayedCard(played_card);
      //             setTurn(first_turn);
      //             setCurrentColor(current_color);
      //             setWinner(winner);
      //          }
      //       }
      //       try {
      //          checkChanged();
      //       } catch (e: any) {
      //          console.log(e.response.data.message);
      //       }
      //    }, 5000);
   
      //    return () => {
      //       clearInterval(interval);
      //    };
      // });

      /* TAMBIEN FUNCIONA */
      // const intervalRef = useRef<any>(null);
      // // Llama a checkChanged cada 5 segundos
      // useEffect(() => {
      //    intervalRef.current = setInterval(() => {
      //       checkChanged();
      //       if (winner !== null) clearInterval(intervalRef.current);
            
      //    }, 1500);
      //    return () => {
      //       clearInterval(intervalRef.current);
      //    };
      // }, []);