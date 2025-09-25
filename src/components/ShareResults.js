import React, { useState } from "react";
import axios from "axios";
import "./ShareResults.css";

const ShareResults = ({ score }) => {
  const [status, setStatus] = useState("");

  const handleShare = async () => {
    try {
      // Call backend endpoint that integrates with X (Twitter) API
      const response = await axios.post("http://localhost:5000/api/share", {
        message: `I just scored ${score} points on MegaETH! 🚀 #MegaETH #Quiz`,
      });

      if (response.data.success) {
        setStatus("✅ Shared successfully to X (Twitter)!");
      } else {
        setStatus("⚠️ Failed to share. Try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error while sharing.");
    }
  };

  return (
    <div className="share-container">
      <h2>Share Your Results</h2>
      <p>Your Score: <strong>{score}</strong></p>
      <button className="share-btn" onClick={handleShare}>
        Share to X (Twitter)
      </button>
      {status && <p className="share-status">{status}</p>}
    </div>
  );
};

export default ShareResults;
