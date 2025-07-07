import { useState } from "react";
import "./App.css";

const questionPairs = [
  {
    regular: "Who is most likely to show up late?",
    imposter: "Who is most likely to show up early?"
  },
  {
    regular: "Who would wear bright colors?",
    imposter: "Who would wear dark colors?"
  },
  {
    regular: "Who is most likely to survive a zombie apocalypse?",
    imposter: "Who is most likely to die first in a zombie apocalypse?"
  },
  {
    regular: "Who is most likely to become famous?",
    imposter: "Who is least likely to become famous?"
  },
  {
    regular: "Who is most likely to spend all their money?",
    imposter: "Who is most likely to save every penny?"
  },
  {
    regular: "Who would win in a rap battle?",
    imposter: "Who would embarrass themselves in a rap battle?"
  },
  {
    regular: "Who is most likely to cry during a movie?",
    imposter: "Who is most likely to laugh during a sad movie?"
  },
  {
    regular: "Who is most likely to ghost someone?",
    imposter: "Who is most likely to double text?"
  },
  {
    regular: "Who is most likely to forget their own birthday?",
    imposter: "Who is most likely to remind everyone of their birthday?"
  },
  {
    regular: "Who is most likely to prank a friend?",
    imposter: "Who is most likely to fall for a prank?"
  }
];

export default function App() {
  const [pair, setPair] = useState(null);
  const [imposterIndex, setImposterIndex] = useState(null);

  const generate = () => {
    const p = questionPairs[Math.floor(Math.random() * questionPairs.length)];
    const players = parseInt(prompt("How many players?"));
    if (isNaN(players) || players < 2) return alert("Enter at least 2 players.");
    const imposter = Math.floor(Math.random() * players);
    setPair(p);
    setImposterIndex(imposter);
    alert(`Player ${imposter + 1} is the imposter (tell them privately)`);

  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Imposter Game</h1>
      <button onClick={generate}>Start New Round</button>
      {pair && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Regular Question:</strong> {pair.regular}</p>
          <p><strong>Imposter Question:</strong> {pair.imposter}</p>
          <small>Privately message the imposter their version!</small>
        </div>
      )}
    </div>
  );
}