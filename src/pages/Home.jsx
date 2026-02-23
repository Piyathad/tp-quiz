import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, difficulties } from "../data/data";
import "./Home.css";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const navigate = useNavigate();

  const canStart = selectedCategory !== null && selectedDifficulty !== null;

  function handleStart() {
    navigate("/quiz", {
      state: {
        categoryId: selectedCategory,
        difficulty: selectedDifficulty,
      },
    });
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Quiz</h1>

      <div className="home-section">
        <h2 className="home-label">Choisis une catégorie :</h2>
        <select
          className="home-select"
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>Sélectionne</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="home-section">
        <h2 className="home-label">Choisis une difficulté :</h2>
        <div className="home-button-row">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => setSelectedDifficulty(diff.value)}
              className={`diff-button ${selectedDifficulty === diff.value ? "selected" : ""}`}
            >
              {diff.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        disabled={!canStart}
        className="start-button"
      >
        Démarrer le Quiz
      </button>
    </div>
  );
}

export default Home;