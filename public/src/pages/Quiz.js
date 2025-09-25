import React, { useState, useEffect } from "react";
import { generateQuestion, checkAnswer } from "../services/api";

export default function Quiz() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const loadQuestion = async () => {
    const res = await generateQuestion();
    setQuestion(res.data);
    setAnswer("");
    setFeedback("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await checkAnswer({ questionId: question.id, answer });
      setFeedback(res.data.correct ? "✅ Correct!" : "❌ Wrong!");
    } catch {
      setFeedback("Error submitting answer.");
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <div className="quiz-container">
      <h2>Quiz Time</h2>
      {question ? (
        <form onSubmit={handleSubmit}>
          <p>{question.text}</p>
          {question.options?.map((opt, idx) => (
            <label key={idx}>
              <input
                type="radio"
                value={opt}
                checked={answer === opt}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {opt}
            </label>
          ))}
          <button type="submit">Submit</button>
          {feedback && <p>{feedback}</p>}
          <button type="button" onClick={loadQuestion}>
            Next Question
          </button>
        </form>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}
