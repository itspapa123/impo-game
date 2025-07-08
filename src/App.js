import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const questionPairs = [
  {
    regular: "Who is most likely to show up late?",
    imposter: "Who is most likely to show up early?",
  },
  {
    regular: "Who would wear bright colors?",
    imposter: "Who would wear dark colors?",
  },
  {
    regular: "Who is most likely to survive a zombie apocalypse?",
    imposter: "Who is most likely to die first in a zombie apocalypse?",
  },
  {
    regular: "Who is most likely to become famous?",
    imposter: "Who is least likely to become famous?",
  },
  {
    regular: "Who is most likely to spend all their money?",
    imposter: "Who is most likely to save every penny?",
  },
  {
    regular: "Who would win in a rap battle?",
    imposter: "Who would embarrass themselves in a rap battle?",
  },
  {
    regular: "Who is most likely to cry during a movie?",
    imposter: "Who is most likely to laugh during a sad movie?",
  },
  {
    regular: "Who is most likely to ghost someone?",
    imposter: "Who is most likely to double text?",
  },
  {
    regular: "Who is most likely to forget their own birthday?",
    imposter: "Who is most likely to remind everyone of their birthday?",
  },
  {
    regular: "Who is most likely to prank a friend?",
    imposter: "Who is most likely to fall for a prank?",
  },
];

const sessionKey = "imposter-game-session";

export default function ImposterGame() {
  const [players, setPlayers] = useState([]);
  const [userId, setUserId] = useState(() => {
    const existingId = localStorage.getItem("imposter-user-id");
    if (existingId) return existingId;
    const newId = uuidv4();
    localStorage.setItem("imposter-user-id", newId);
    return newId;
  });
  const [isReady, setIsReady] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [imposterId, setImposterId] = useState(null);
  const [questionPair, setQuestionPair] = useState(null);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem(sessionKey)) || [];
    if (!storedPlayers.includes(userId)) {
      localStorage.setItem(sessionKey, JSON.stringify([...storedPlayers, userId]));
    }
    const interval = setInterval(() => {
      const updated = JSON.parse(localStorage.getItem(sessionKey)) || [];
      setPlayers(Array.from(new Set(updated)));
    }, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleReady = () => {
    setIsReady(true);
    const alreadyAssigned = localStorage.getItem("imposter");
    if (players.length >= 3 && !alreadyAssigned) {
      const pair = questionPairs[Math.floor(Math.random() * questionPairs.length)];
      const imposter = players[Math.floor(Math.random() * players.length)];
      localStorage.setItem("imposter", imposter);
      localStorage.setItem("questionPair", JSON.stringify(pair));
      setAssigned(true);
      setImposterId(imposter);
      setQuestionPair(pair);
    }
  };

  const handleEndGame = () => {
    localStorage.removeItem("imposter");
    localStorage.removeItem("questionPair");
    localStorage.removeItem(sessionKey);
    localStorage.removeItem("imposter-user-id");
    window.location.reload();
  };

  useEffect(() => {
    const imposter = localStorage.getItem("imposter");
    const pair = JSON.parse(localStorage.getItem("questionPair"));
    if (imposter && pair) {
      setImposterId(imposter);
      setQuestionPair(pair);
      setAssigned(true);
    }
  }, [players]);

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Imposter Game (Multiplayer)
      </h1>
      <p>Players in lobby: {players.length}</p>
      {!isReady ? (
        <button onClick={handleReady} style={{ marginTop: 12, padding: 10, fontSize: 16 }}>
          I'm Ready
        </button>
      ) : (
        <p style={{ color: "green", marginTop: 12 }}>Waiting for others or assigned...</p>
      )}
      {assigned && questionPair && (
        <div style={{ marginTop: 24, border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
          <p>
            <strong>Your Question:</strong> <br />
            {userId === imposterId ? questionPair.imposter : questionPair.regular}
          </p>
        </div>
      )}
      <button
        onClick={handleEndGame}
        style={{ marginTop: 32, backgroundColor: "red", color: "white", padding: 10 }}
      >
        End Game
      </button>
    </div>
  );
}