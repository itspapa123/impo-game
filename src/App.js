import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const [userId] = useState(uuidv4());
  const [isReady, setIsReady] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [imposterId, setImposterId] = useState(null);
  const [questionPair, setQuestionPair] = useState(null);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(sessionKey)) || [];
    if (!existing.includes(userId)) {
      localStorage.setItem(sessionKey, JSON.stringify([...existing, userId]));
    }
    const interval = setInterval(() => {
      const updated = JSON.parse(localStorage.getItem(sessionKey)) || [];
      setPlayers(updated);
    }, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleReady = () => {
    setIsReady(true);
    if (players.length >= 3) {
      const pair = questionPairs[Math.floor(Math.random() * questionPairs.length)];
      const imposter = players[Math.floor(Math.random() * players.length)];
      localStorage.setItem("imposter", imposter);
      localStorage.setItem("questionPair", JSON.stringify(pair));
      setAssigned(true);
      setImposterId(imposter);
      setQuestionPair(pair);
    }
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Imposter Game (Multiplayer)</h1>
      <p className="mb-2">Players in lobby: {players.length}</p>
      {!isReady ? (
        <Button onClick={handleReady}>I'm Ready</Button>
      ) : (
        <p className="text-green-600">Waiting for others or assigned...</p>
      )}
      {assigned && questionPair && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <p>
              <strong>Your Question:</strong> <br />
              {userId === imposterId ? questionPair.imposter : questionPair.regular}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}