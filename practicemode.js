import React, { useState } from 'react';

export default function PracticeMode() {
  const [attempts, setAttempts] = useState(0);
  const correctAnswer = "Python";

  const handleAnswer = (selected) => {
    setAttempts(attempts + 1);
    if (selected === correctAnswer) {
      alert("✅ Correct! You got it in " + (attempts + 1) + " attempt(s).");
    } else {
      alert("❌ Wrong! Try again.");
    }
  };

  return (
    <div>
      <h2>Practice Mode</h2>
      <p>Which language is used for React development?</p>
      <button onClick={() => handleAnswer("Python")}>Python</button>
      <button onClick={() => handleAnswer("C++")}>C++</button>
      <button onClick={() => handleAnswer("HTML")}>HTML</button>
      <button onClick={() => handleAnswer("Java")}>Java</button>
    </div>
  );
}
