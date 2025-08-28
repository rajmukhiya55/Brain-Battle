import React, { useState, useEffect } from "react";
import "./result.css";

export default function Result() {
  const [mcqResults, setMcqResults] = useState([]);
  const [timedResults, setTimedResults] = useState([]);
  const [previewIndex, setPreviewIndex] = useState({ type: null, index: null });

  useEffect(() => {
    // ✅ Load normal quiz results
    const historyResults = JSON.parse(localStorage.getItem("historyQuizHistory")) || [];
    const geographyResults = JSON.parse(localStorage.getItem("geographyQuizHistory")) || [];
    const scienceResults = JSON.parse(localStorage.getItem("scienceQuizHistory")) || [];
    const sportsResults = JSON.parse(localStorage.getItem("sportsQuizHistory")) || [];
    const animalsResults = JSON.parse(localStorage.getItem("animalsQuizHistory")) || [];
    const generalKnowledgeResults = JSON.parse(localStorage.getItem("generalKnowledgeQuizHistory")) || [];

    const otherResultsRaw = JSON.parse(localStorage.getItem("otherQuizHistory")) || [];
    const otherResults = otherResultsRaw.map((q) => ({
      ...q,
      title: q.title || "Other Quiz",
      score: q.score || (q.reviewData ? q.reviewData.filter((r) => r.isCorrect).length : 0),
      total: q.questions?.length || q.reviewData?.length || 0,
      reviewData: q.reviewData?.length
        ? q.reviewData
        : (q.questions || []).map((question) => ({
            ...question,
            options: question.options || [],
            userAnswer: question.userAnswer || null,
            isCorrect: question.userAnswer === question.correctAnswer,
          })),
      date: q.date || new Date().toLocaleString(),
    }));

    // ✅ Load timed quiz results
    const timedQuizResults = JSON.parse(localStorage.getItem("timedQuizHistory")) || [];

    setMcqResults([
      ...historyResults,
      ...geographyResults,
      ...scienceResults,
      ...sportsResults,
      ...animalsResults,
      ...generalKnowledgeResults,
      ...otherResults,
    ]);
    setTimedResults(timedQuizResults);
  }, []);

  const togglePreview = (type, index) => {
    setPreviewIndex(
      previewIndex.type === type && previewIndex.index === index
        ? { type: null, index: null }
        : { type, index }
    );
  };

  const renderResults = (results, type) => (
    <div className="result-list">
      {results.length === 0 ? (
        <p>No quiz results yet.</p>
      ) : (
        results.map((res, idx) => {
          const [datePart, ...timeParts] = res.date ? res.date.split(", ") : ["", ""];
          const timePart = timeParts.join(", ");
          return (
            <div key={idx}>
              <div className="result-item">
                <div className="result-row">
                  <span className="quiz-title">
                    {res.category === "otherquiz"
                      ? res.title
                      : res.category
                      ? `${res.category.toUpperCase()} QUIZ`
                      : res.title
                      ? `${res.title.toUpperCase()} QUIZ` 
                      : "QUIZ"}
                  </span>
                  <span className="score">
                    Score: {res.score} / {res.total}
                  </span>
                  <span className="date">{datePart}</span>
                  <span className="time">{timePart}</span>
                  <button
                    className="preview-btn"
                    onClick={() => togglePreview(type, idx)}
                  >
                    {previewIndex.type === type && previewIndex.index === idx
                      ? "Close"
                      : "Preview"}
                  </button>
                </div>
              </div>

              {previewIndex.type === type && previewIndex.index === idx && (
                <div className="preview-section">
                  {(res.reviewData || []).map((q, i) => (
                    <div key={i}>
                      <p>
                        <b>
                          {i + 1}. {q.question}
                        </b>
                      </p>
                      {(q.options || []).map((opt, optionIdx) => {
                        let styleClass = "";
                        if (q.correctAnswer === optionIdx || q.correctAnswer === opt)
                          styleClass = "correct";
                        if (
                          (q.userAnswer === optionIdx || q.userAnswer === opt) &&
                          !q.isCorrect
                        )
                          styleClass = "wrong";
                        return (
                          <div key={optionIdx} className={`option ${styleClass}`}>
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <div className="result-container">
      <h1>MCQ Quiz Results</h1>
      {renderResults(mcqResults, "mcq")}

      <h1>Timed MCQ Quiz Results</h1>
      {renderResults(timedResults, "timed")}
    </div>
  );
}
