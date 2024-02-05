import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Create a timer that runs every second
    const timer = setTimeout(() => {
      // Decrease the time remaining by 1 second
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]); 

  function handleAnswer(isCorrect) {
  
    setTimeRemaining(10);
    
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;
  useEffect(() => {
    if (timeRemaining == 0) {
      setTimeRemaining(10); 
      onAnswered(false); 
    }
  }, [timeRemaining, onAnswered]);

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index == correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
