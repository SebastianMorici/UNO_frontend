import { useLocation } from "react-router-dom";
import { Card } from "./Card";
import "./index.css"

export const Table = () => {


   return (
      <div className="table">

         <div className="deck deck_player3">

            <Card />        
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

         </div>
         <div className="deck deck_player2">
            
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />


         </div>
         <div className="deck deck_player1">
            
            <Card color="black" value="wild_draw_four" />
            <Card color="red" value="two" />
            <Card color="red" value="nine" />
            <Card color="blue" value="reverse" />
            <Card color="green" value="skip" />
            <Card color="yellow" value="zero" />

         </div>
         <div className="deck deck_played">
            <Card color="yellow" value="seven"/>
         </div>
         <div className="deck deck_draw">
            <Card />
         </div>
      </div>
   )
};
