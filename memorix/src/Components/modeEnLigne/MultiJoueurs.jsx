import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import "./onlineGame.css";

const states = {
  cards: [
    {
      src: "gon.jpg", // Image de la carte
      name: "gon", // Nom de la carte
      right: true, // Indique si la carte est correctement associée
    },
    {
      src: "leorio.jpg", // Image de la carte
      name: "leorio", // Nom de la carte
      right: true, // Indique si la carte est correctement associée
    },
    // ... Ajoutez d'autres cartes ici
  ],
  mainPlayer: { turn: true, score: 0 },
  enemyPlayer: { turn: true, score: 0 },
  choix1: "kil.jpg",
  choix2: null,
};

function MultiJoueurs({ perssonages }) {
  const [cards, setCards] = useState(perssonages);
  const [turns, setTurns] = useState(0);
  const [mainPlayer, setMainPlayer] = useState({ turn: true, score: 0 });
  const [enemyPlayer, setEnemyPlayer] = useState({ turn: true, score: 0 });
  const [done, setDone] = useState(0);
  const [choix1, setChoix1] = useState(null);
  const [choix2, setChoix2] = useState(null);
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  const handleTurns = async (card, index) => {
    const newCards = cards.map((element, idx) => {
      if (element.id === card.id) {
        return { ...element, right: true };
      }
      return element;
    });
    if (mainPlayer.turn) {
      const resetCard = cards.map((element, idx) => {
        if (element.src === choix1 || element.src === choix2) {
          return { ...element, right: false };
        }
        return element;
      });
      if (choix1) {
        setCards(newCards);
        await channel.sendEvent({
          type: "game-move",
          data: { newCards },
        });
        if (choix1 !== card.src) {
          console.log("not matched");
          setTimeout(async () => {
            await channel.sendEvent({
              type: "reset-move",
              data: { resetCard },
            });
            setCards(resetCard);
            setChoix1(null);
            setChoix2(null);
          }, 300);
          setMainPlayer({ ...mainPlayer, turn: false });
          setEnemyPlayer({ ...enemyPlayer, turn: true });
        } else {
          const newScore = mainPlayer.score + 1;
          setChoix1(null);
          setChoix2(null);
          setMainPlayer({ ...mainPlayer, score: newScore });
          await channel.sendEvent({
            type: "success-move",
            data: { enemyScore: newScore },
          });
        }
      } else {
        choix1 ? setChoix2(card.src) : setChoix1(card.src);
        setCards(newCards);
        setEnemyPlayer({ ...enemyPlayer, turn: false });
        await channel.sendEvent({
          type: "game-move",
          data: { newCards, enemy: "false" },
        });
      }
    }
  };

  useEffect(() => {
    console.log("choix1", choix1);
    console.log("choix2", choix2);
    console.log("mainPlayer.turn", mainPlayer.turn);
    console.log("enemyPlayer", enemyPlayer.turn);
  });
  const shuffleCard = async () => {
    const shuffledCards = perssonages
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    await channel.sendEvent({
      type: "new-Game",
      data: { shuffledCards },
    });
    setCards(shuffledCards);
    setMainPlayer({ turn: true, score: 0 });
    setEnemyPlayer({ turn: true, score: 0 });
  };
  const checkWinner = () => {
    if (mainPlayer.score + enemyPlayer.score === 6) {
      if (mainPlayer.score > enemyPlayer.score) {
        console.log("You are the winner");
      } else if (mainPlayer.score < enemyPlayer.score) {
        console.log("you lost");
      } else {
        console.log("equalityyy");
      }
    }
  };
  useEffect(() => {
    checkWinner();
    channel.on(async (event) => {
      if (event.type == "game-move" && event.user.id !== client.userID) {
        setCards(event.data.newCards);
        event.data.enemy && setMainPlayer({ ...mainPlayer, turn: false });
      }
      if (event.type == "reset-move" && event.user.id !== client.userID) {
        setCards(event.data.resetCard);
        setMainPlayer({ ...mainPlayer, turn: true });
        setEnemyPlayer({ ...enemyPlayer, turn: false });
      }
      if (event.type == "success-move" && event.user.id !== client.userID) {
        setEnemyPlayer({ ...enemyPlayer, score: event.data.enemyScore });
      }
      if (event.type == "new-Game" && event.user.id !== client.userID) {
        setMainPlayer({ turn: true, score: 0 });
        setEnemyPlayer({ turn: true, score: 0 });
        setCards(event.data.shuffledCards);
      }
    });
  }, [cards, mainPlayer]);
  return (
    <div className="game-style">
      <div className="user-game-style">
        <h2>Score Player A :{mainPlayer.score}</h2>
      </div>

      <div className="image-grid">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            {card.right ? (
              <img className="front" src={card.src} alt="Card front" />
            ) : (
              <img
                className="back"
                src={require('../../image/backgrounds/back-Card.jpg')}
                onClick={() => {
                  handleTurns(card, index);
                }}
                alt="Card back"
              />
            )}
          </div>
        ))}
        <h1></h1>
        <button onClick={shuffleCard}>newGame</button>
      </div>

      <div className="user-game-style">
        <h2>Score Player B :{enemyPlayer.score}</h2>
      </div>
    </div>
  );
}

export default MultiJoueurs;
