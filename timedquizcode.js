import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TimedQuizCode() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const navigate = useNavigate();

  // Load quizzes from localStorage
  const historyQuizzes = JSON.parse(localStorage.getItem("historyQuizzes")) || [];
  const geographyQuizzes = JSON.parse(localStorage.getItem("geographyQuizzes")) || [];
  const scienceQuizzes = JSON.parse(localStorage.getItem("scienceQuizzes")) || [];
  const sportsQuizzes = JSON.parse(localStorage.getItem("sportsQuizzes")) || [];
  const animalsQuizzes = JSON.parse(localStorage.getItem("animalsQuizzes")) || [];
  const generalKnowledgeQuizzes = JSON.parse(localStorage.getItem("generalKnowledgeQuizzes")) || [];
  const otherQuizzes = JSON.parse(localStorage.getItem("otherQuizzes")) || [];

  // Start quiz with timer
  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(quiz.questions.length * 45); // 45 sec per question
  };

  // Handle option selection
  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });
  };

  // Navigation
  const goToNext = () => {
    if (currentQuestionIndex + 1 < selectedQuiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  // Finish Quiz
  const finishQuiz = () => {
    let finalScore = 0;
    let questionReview = [];

    selectedQuiz.questions.forEach((q, idx) => {
      const userAnswer = selectedAnswers[idx];
      let isCorrect = false;

      if (typeof q.correctAnswer === "number" && userAnswer === q.correctAnswer) {
        isCorrect = true;
        finalScore++;
      } else if (typeof q.correctAnswer === "string") {
        if (
          (typeof userAnswer === "number" && q.options[userAnswer] === q.correctAnswer) ||
          userAnswer === q.correctAnswer
        ) {
          isCorrect = true;
          finalScore++;
        }
      }

      questionReview.push({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer,
        isCorrect,
      });
    });

    const newResult = {
      quizTitle: selectedQuiz.title || "Quiz",
      category: selectedQuiz.category || "",
      score: finalScore,
      total: selectedQuiz.questions.length,
      date: new Date().toLocaleString(),
      reviewData: questionReview,
    };

    // ✅ Save under Timed Quiz history instead of regular quiz history
    let storageKey = "timedQuizHistory";
    let history = JSON.parse(localStorage.getItem(storageKey)) || [];
    history.push(newResult);
    localStorage.setItem(storageKey, JSON.stringify(history));

    navigate("/result");
  };

  // Timer countdown
  useEffect(() => {
    if (!selectedQuiz || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz(); // auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedQuiz, timeLeft]);

  // Format time (hh:mm:ss or mm:ss)
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    }
  };

  // --- QUIZ SELECTION SCREEN ---
  if (!selectedQuiz) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>History Quizzes</h2>
        {historyQuizzes.length === 0 && <p>No history quizzes available. Create one first!</p>}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          {historyQuizzes.map((quiz, index) => (
            <div
              key={`history-${index}`}
              onClick={() => startQuiz(quiz)}
              style={quizCardStyle(quiz.templateImage)}
            >
              {quiz.title || `History Quiz ${index + 1}`}
            </div>
          ))}
        </div>

        <h2>Geography Quizzes</h2>
        {geographyQuizzes.length === 0 && <p>No geography quizzes available. Create one first!</p>}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          {geographyQuizzes.map((quiz, index) => (
            <div
              key={`geo-${index}`}
              onClick={() => startQuiz(quiz)}
              style={quizCardStyle(quiz.templateImage)}
            >
              {quiz.title || `Geography Quiz ${index + 1}`}
            </div>
          ))}
        </div>

        <h2>Science Quizzes</h2>
        {scienceQuizzes.length === 0 && <p>No science quizzes available. Create one first!</p>}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          {scienceQuizzes.map((quiz, index) => (
            <div
              key={`science-${index}`}
              onClick={() => startQuiz(quiz)}
              style={quizCardStyle(quiz.templateImage)}
            >
              {quiz.title || `Science Quiz ${index + 1}`}
            </div>
          ))}
        </div>

        <h2>Sports Quizzes</h2>
        {sportsQuizzes.length === 0 && <p>No sports quizzes available. Create one first!</p>}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          {sportsQuizzes.map((quiz, index) => (
            <div
              key={`sports-${index}`}
              onClick={() => startQuiz(quiz)}
              style={quizCardStyle(quiz.templateImage)}
            >
              {quiz.title || `Sports Quiz ${index + 1}`}
            </div>
          ))}
        </div>

        <h2>Animals Quizzes</h2>
        {animalsQuizzes.length === 0 && <p>No animals quizzes available. Create one first!</p>}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          {animalsQuizzes.map((quiz, index) => (
            <div
              key={`animals-${index}`}
              onClick={() => startQuiz(quiz)}
              style={quizCardStyle(quiz.templateImage)}
            >
              {quiz.title || `Animals Quiz ${index + 1}`}
            </div>
          ))}
        </div>

        <h2>General Knowledge Quizzes</h2>
        {generalKnowledgeQuizzes.length === 0 && <p>No general knowledge quizzes available. Create one first!</p>}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          {generalKnowledgeQuizzes.map((quiz, index) => (
            <div
              key={`general-${index}`}
              onClick={() => startQuiz(quiz)}
              style={quizCardStyle(quiz.templateImage)}
            >
              {quiz.title || `General Knowledge Quiz ${index + 1}`}
            </div>
          ))}
        </div>

        <h2>Other Quizzes</h2>
        {otherQuizzes.length === 0 && <p>No other quizzes available. Create one first!</p>}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          {otherQuizzes.map((quiz, index) => (
            <div
              key={`other-${index}`}
              onClick={() => startQuiz(quiz)}
              style={quizCardStyle(quiz.templateImage)}
            >
              {quiz.title || `Other Quiz ${index + 1}`}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- QUIZ SCREEN ---
  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${selectedQuiz.templateImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "20px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <button
        onClick={() => setSelectedQuiz(null)}
        style={{
          position: "absolute",
          left: "20px",
          top: "80px",
          padding: "8px 15px",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>

      <h2
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "20px",
          borderRadius: "8px",
          display: "block",
          width: "80%",
          maxWidth: "1000px",
          margin: "40px auto 20px auto",
          textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
        }}
      >
        {`${
    (selectedQuiz.title ||
      (selectedQuiz.category ? selectedQuiz.category.replace(/-/g, " ") : "Quiz")
    ).toUpperCase()
  } QUIZ`}
      </h2>

      <br/>

      {/* TIMER DISPLAY */}
      <p
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
          textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
        }}
      >
        ⏳ Time Left: {formatTime(timeLeft)}
      </p>

      <br/>

      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginTop: "15px",
          marginBottom: "20px",
          background: "rgba(0,0,0,0.6)",
          padding: "10px 20px",
          borderRadius: "8px",
          textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{currentQuestionIndex + 1}.</span>{" "}
        {currentQuestion.question}
      </p>

      <div>
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(idx)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              padding: "12px",
              width: "280px",
              border:
                selectedAnswers[currentQuestionIndex] === idx ? "2px solid green" : "none",
              background: "rgba(0,0,0,0.7)",
              color: "white",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "16px",
              marginBottom: "10px",
              textAlign: "left",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{idx + 1}</span> {option}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={goToPrevious}
          disabled={currentQuestionIndex === 0}
          style={{
            padding: "10px 15px",
            marginRight: "10px",
            background: currentQuestionIndex === 0 ? "gray" : "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentQuestionIndex === 0 ? "not-allowed" : "pointer",
          }}
        >
          ⬅ Back
        </button>

        {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
          <button
            onClick={goToNext}
            style={{
              padding: "10px 15px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Next ➡
          </button>
        ) : (
          <button
            onClick={finishQuiz}
            style={{
              padding: "10px 15px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Finish Quiz ✅
          </button>
        )}
      </div>
    </div>
  );
}

// Extracted style to avoid repetition
function quizCardStyle(image) {
  return {
    width: "250px",
    height: "150px",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  };
}
