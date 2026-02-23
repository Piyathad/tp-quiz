import { useLocation, useNavigate } from "react-router-dom";
import "./Score.css";

function Score() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score ?? 0;
  const total = 10;

  function getMessage() {
    if (score <= 4) return "Pas génial là !";
    if (score <= 7) return "Ça commence à venir";
    return "Bravo !";
  }

  return (
    <div className="score-container">
      <h1 className="score-title">Résultat</h1>

      <div className="score-badge">
        <span className="score-number">{score}</span>
        <span className="score-total"> / {total}</span>
      </div>

      <p className="score-message">{getMessage()}</p>

      <button className="score-btn" onClick={() => navigate("/")}>
        Rejouer
      </button>
    </div>
  );
}

export default Score;