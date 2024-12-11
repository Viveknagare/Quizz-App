import React, { useState } from "react";
import "../Components/QuizzApp.css";

// images
import Lion from "../assets/Lion.jpeg";
import Dog from "../assets/Dog.jpeg";
import Elephant from "../assets/Elephant.jpeg";
import Giraffe from "../assets/Giraffe.jpeg";
import Monkey from "../assets/Monkey.jpeg";
import Rabbit from "../assets/Rabbit.jpeg";
import Sheep from "../assets/Sheep.jpeg";
import Snake from "../assets/Snake.jpeg";
import Tiger from "../assets/Tiger.jpeg";
import Zebra from "../assets/Zebra.jpeg";

const questions = [
  {
    image: Lion,
    options: ["Elephant", "Lion", "Tiger", "Bear"],
    correct: "Lion",
  },
  {
    image: Dog,
    options: ["Rabbit", "Elephant", "Lion", "Dog"],
    correct: "Dog",
  },
  {
    image: Elephant,
    options: ["Lion", "Elephant", "Snake", "Zebra"],
    correct: "Elephant",
  },
  {
    image: Giraffe,
    options: ["Giraffe", "Zebra", "Lion", "Zebra"],
    correct: "Giraffe",
  },
  {
    image: Monkey,
    options: ["Snake", "Elephant", "Monkey", "Zebra"],
    correct: "Monkey",
  },
  {
    image: Rabbit,
    options: ["Snake", "Zebra", "Lion", "Rabbit"],
    correct: "Rabbit",
  },
  {
    image: Sheep,
    options: ["Monkey", "Elephant", "Sheep", "Zebra"],
    correct: "Sheep",
  },
  {
    image: Snake,
    options: ["Snake", "Sheep", "Tiger", "Zebra"],
    correct: "Snake",
  },
  {
    image: Tiger,
    options: ["Sheep", "Monkey", "Zebra", "Tiger"],
    correct: "Tiger",
  },
  {
    image: Zebra,
    options: ["Lion", "Tiger", "Zebra", "Giraffe"],
    correct: "Zebra",
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false); // To disable options after selection
  const [quizFinished, setQuizFinished] = useState(false); // To check if the quiz is finished

  // Handle option click
  const handleOptionClick = (option) => {
    if (isOptionDisabled) return; // Prevent further clicks after selecting an option
    setSelectedOption(option);
    setIsOptionDisabled(true); // Disable further clicks

    if (option === questions[currentQuestion].correct) {
      setScore(score + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("wrong");
    }

    // Wait for 3 seconds to display the next question
    setTimeout(() => {
      setSelectedOption(null);
      setAnswerStatus(null);
      setIsOptionDisabled(false); // Enable options again for the next question

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizFinished(true); // Mark quiz as finished
      }
    }, 3000); // 3 seconds delay before moving to the next question
  };

  // Handle reattempt click
  const handleReattempt = () => {
    setCurrentQuestion(0); // Reset to the first question
    setScore(0);           // Reset score
    setQuizFinished(false); // Reset quiz finished state
    setSelectedOption(null); // Clear selected option
    setAnswerStatus(null);   // Clear answer status
  };

  return (
    <div className="quiz-container">
      {!quizFinished ? (
        <>
          <h1>Animal Quiz</h1>
          <div className="question-container">
            <img
              src={questions[currentQuestion].image}
              alt="Animal"
              className="animal-image"
            />
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleOptionClick(option)}
                  disabled={isOptionDisabled} // Disable buttons after a selection is made
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Show feedback if the answer was correct or wrong */}
            {answerStatus === "correct" && (
              <h3 className="feedback">Correct!</h3>
            )}
            {answerStatus === "wrong" && (
              <div className="feedback">
                <h3>Wrong answer.</h3>
                <h3>The correct answer is: {questions[currentQuestion].correct}</h3>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="score-container">
          <h1>Quiz Finished!</h1>
          <h2>Your score: {score} out of {questions.length}</h2>

          {/* Reattempt button */}
          <button className="reattempt-btn" onClick={handleReattempt}>
            Reattempt Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;