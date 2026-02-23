import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeHtmlEntities } from "../utils/decodeHtml";
import "./Quiz.css";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const categoryId = location.state?.categoryId ?? 9;
  const difficulty = location.state?.difficulty ?? "easy";

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
  try {
    for (let tentative = 1; tentative <= 3; tentative++) {
      await new Promise((resolve) => setTimeout(resolve, tentative * 2000));

      const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code === 0) {
        setQuestions(data.results);
        setLoading(false);
        return;
      }

      if (tentative === 3) {
        setError("L'API est surchargée. Attends 30 secondes et réessaie !");
        setLoading(false);
      }
    }
  } catch (err) {
    setError("Erreur réseau. Vérifie ta connexion.");
    setLoading(false);
  }
}

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;

    const current = questions[currentIndex];
    const allAnswers = [
      ...current.incorrect_answers,
      current.correct_answer,
    ];
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
    setAnswered(false);
    setSelectedAnswer(null);
  }, [currentIndex, questions]);

  function handleAnswer(answer) {
    if (answered) return;

    setAnswered(true);
    setSelectedAnswer(answer);

    const newScore = answer === questions[currentIndex].correct_answer
      ? score + 1
      : score;
    
    if (answer === questions[currentIndex].correct_answer) {
      setScore(newScore);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        navigate("/score", { state: { score: newScore } });
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 1500);
  }

  if (loading) {
    return (
      <div className="quiz-center">
        <p>Chargement des questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-center">
        <p style={{ color: "#e94560" }}>{error}</p>
        <button className="quiz-back-btn" onClick={() => navigate("/")}>
          Retour
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const correctAnswer = currentQuestion.correct_answer;

  return (
    <div className="quiz-container">

      <p className="quiz-progress-text">
        Question {currentIndex + 1} / {questions.length}
      </p>

      <div className="quiz-progress-bar-bg">
        <div
          className="quiz-progress-bar-fill"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <h2 className="quiz-question">
        {decodeHtmlEntities(currentQuestion.question)}
      </h2>

      <div className="quiz-answers-grid">
        {shuffledAnswers.map((answer, i) => {
          let extraClass = "";
          if (answered) {
            if (answer === correctAnswer) {
              extraClass = "correct";
            } else if (answer === selectedAnswer) {
              extraClass = "wrong";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(answer)}
              className={`answer-btn ${extraClass}`}
              disabled={answered}
            >
              {decodeHtmlEntities(answer)}
            </button>
          );
        })}
      </div>

      <p className="quiz-score-hint">Score actuel : {score} / {questions.length}</p>
    </div>
  );
}

export default Quiz;