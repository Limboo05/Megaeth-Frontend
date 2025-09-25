// src/pages/Leaderboard.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/leaderboard");
        setLeaderboard(res.data.leaderboard);
        setCurrentUser(res.data.currentUser);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>

      {/* Top 10 Users */}
      <div className="leaderboard-table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => {
              const rank = index + 1;
              return (
                <tr
                  key={user._id}
                  className={
                    currentUser && currentUser.userId === user._id ? "highlight" : ""
                  }
                >
                  <td>{getMedal(rank)}</td>
                  <td>{user.username}</td>
                  <td>{user.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Current User Rank */}
      {currentUser && (
        <div className="current-user-card">
          <h3>Your Rank</h3>
          <p>
            <strong>Rank:</strong> {getMedal(currentUser.rank)}
          </p>
          <p>
            <strong>Score:</strong> {currentUser.score}
          </p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
