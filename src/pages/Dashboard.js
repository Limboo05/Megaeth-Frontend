import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch {
        navigate("/login");
      }
    }
    fetchProfile();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h2>Welcome {profile?.username}</h2>
      <p>Full Name: {profile?.fullName}</p>
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
      <button onClick={() => navigate("/leaderboard")}>View Leaderboard</button>
    </div>
  );
}
