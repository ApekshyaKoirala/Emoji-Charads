import EmojiBank from "./EmojiBank";
import React,{useEffect} from "react";

function CheckMe({ value, randomIndex, onResult }) {
    const rightEmoji = "✅ ";
    const wrongEmoji = "❌ ";
    const userAnswer = value?.trim().toLowerCase()
    const correctAnswer=randomIndex||[]
    const isCorrect = correctAnswer.map(a=>a.trim().toLowerCase()).includes(userAnswer)
    useEffect(() => {
        if (onResult) {
          onResult(isCorrect)
      }
    }, [isCorrect, onResult])
    
   return (
       <div>
           {isCorrect ?
               <div>Right - {rightEmoji}</div>
               : <div>Wrong - {wrongEmoji}</div>}
       </div>
   );

}
export default CheckMe