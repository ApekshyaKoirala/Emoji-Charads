import React, { useState, useEffect} from 'react'
import CheckMe from './CheckMe'
import EmojiBank from './EmojiBank'

function GameBoard() {
    const [score, setScore] = useState(0)
    const [userInput, setUserInput] = useState('')
    const [showResult, setShowResult]=useState(false)
    
  const [hasScored, setHasScored] = useState(false)
  const [level, setLevel] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const currentQuestion =shuffledQuestions[questionIndex]
  
  function shuffleArray(array) {
    return [...array].sort(()=>Math.random()-0.5)
  }
 
  
  useEffect(() => {
    const levelquestions = EmojiBank[`level${level}`]
  setShuffledQuestions(shuffleArray(levelquestions))
    setQuestionIndex(0)
  }, [level])
  
    const handleClick = () => {
        
        setShowResult(true)
        setHasScored(false)
    }

    const handleResult = (isCorrect) => {
        if (isCorrect && !hasScored) {
            setScore(prevScore => prevScore + 1)
            setHasScored(true)
        }
    }
    const handleNewQuestion = () => {
        
      if (questionIndex < shuffledQuestions.length - 1) {
          setQuestionIndex(questionIndex+1)
      }
      else {
        setLevel(level+1)
      }
      setShowResult(false);
        setUserInput('')
         setHasScored(false);
    }

    useEffect(() => {
      const handleKeyDown=(e)=> {
          if (e.key === 'ArrowRight' && showResult) {
              handleNewQuestion();
            }
        }  
        window.addEventListener('keydown', handleKeyDown)
      return () => {
       window.removeEventListener('keydown', handleKeyDown)
      }
    }, [showResult,questionIndex,shuffledQuestions.length, level])
    
  if (!currentQuestion) {
    return (
        <div>No question available for this level</div>
      )
    }

  return (
    <div>
      <div>score:{score}</div>
      <div>level:{level}</div>

      <div>{currentQuestion.emoji}</div>
      <input
        type="text"
        value={userInput}
        placeholder="Enter your answer"
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      />
      <button onClick={handleClick}>Submit</button>

      {showResult && (
        <div>
          <CheckMe
            value={userInput}
            randomIndex={currentQuestion.answers}
            onResult={handleResult}
          />
          <button onClick={handleNewQuestion}>Next Question</button>
        </div>
      )}

     
    </div>
  );
}

export default GameBoard
