import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './localGame.css'


const states = {
  // Cartes du jeu
  cards: [
    {
      src: "gon.jpg",      // Image de la carte
      name: "gon",          // Nom de la carte
      right: true           // Indique si la carte est correctement associée
    },
    {
      src: "leorio.jpg",    // Image de la carte
      name: "leorio",       // Nom de la carte
      right: true,          // Indique si la carte est correctement associée
    },
    // ... Ajoutez d'autres cartes ici
  ],
  
  // État du joueur A
  playerA: {
    turn: false,  // Indique si c'est le tour du joueur A
    score: 2      // Le score du joueur A
  },
  
  // État du joueur B
  playerB: {
    turn: true,  // Indique si c'est le tour du joueur B
    score: 0     // Le score du joueur B
  },
  
  // Choix du joueur B (pour les cartes retournées)
  choix1: null,  // Première carte choisie par le joueur B
  choix2: null,  // Deuxième carte choisie par le joueur B
  
  // Nombre de cartes déjà retournées en face visible
  done: 2         // Le nombre de cartes déjà retournées en face visible
};


console.log(states);





function DuoGame() {
  const location = useLocation();
  const [turns, setTurns] = useState(0);
  const [playerA, setPlayerA] = useState({ turn: true, score: 0 });
  const [playerB, setPlayerB] = useState({ turn: false, score: 0 });
  const [done, setDone] = useState(0);
  const [choix1, setChoix1] = useState(null);
  const [choix2, setChoix2] = useState(null);
  const [cards, setCards] = useState([...location.state]);

 

  const handleTurns = (card) => {
    const newCards = cards.map((element, idx) => {
      if (element.id === card.id) {
        return { ...element, right: true };
      }
      return element;
    });
    if (playerA.turn) {
      choix1 ? setChoix2(card.src) : setChoix1(card.src);
      if (choix1) {
        setCards(newCards);
        setChoix2(card.src);
      } else {
        setChoix1(card.src);
        setCards(newCards);
      }
    } else {
      //   choix1 ? setChoix2(card.src) : setChoix1(card.src);
      if (choix1) {
        setCards(newCards);
        setChoix2(card.src);
      } else {
        setChoix1(card.src);
        setCards(newCards);
      }
    }
  };
  useEffect(() => {
    console.log("cards", cards);
    console.log("choix1", choix1);
    console.log("choix2", choix2);
    console.log("playerA", playerA);
    console.log("playerB", playerB);

    checkTurns();
  }, [choix1, choix2]);
  const resetTurns = () => {
    setChoix1(null);
    setChoix2(null);
  };
  const checkWinner=()=>{
    if (done === 6) {
      if (playerA.score > playerB.score) {
        alert("player A won");
      } else if (playerA.score < playerB.score) {
        alert("player B won");
      } else {
        alert("DRAW");
      }
    }
  }
  const checkTurns = () => {
    checkWinner()
    checkCardsRotate()
  };
  const checkCardsRotate=()=>{
    if (choix1 && choix2) {
      if (choix1 !== choix2) {
        console.log("hey");
        setTimeout(() => {
          setCards(
            cards.map((element, idx) => {
              if (element.src === choix1 || element.src === choix2) {
                return { ...element, right: false };
              }
              return element;
            })
          );
          resetTurns();
        }, 300);
        if (playerA.turn) {
          setPlayerA({ ...playerA, turn: false });
          setPlayerB({ ...playerB, turn: true });
        } else {
          setPlayerB({ ...playerB, turn: false });
          setPlayerA({ ...playerA, turn: true });
        }
      } else {
        console.log("truue");
        if (playerA.turn) {
          const newTurn = done + 1;
          const newScore = playerA.score + 1;

          resetTurns();
          setDone(newTurn);
          setPlayerA({ ...playerA, score: newScore });
        } else {
          const newTurn = done + 1;
          const newScore = playerB.score + 1;

          resetTurns();
          setDone(newTurn);
          setPlayerB({ ...playerB, score: newScore });
        }
      }
    }
  }
  const shuffleCard = () => {
    const shuffledCards = [...location.state]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffledCards);
    setTurns(0);
    setDone(0);
    setPlayerB({ ...playerB, score: 0 });
    setPlayerA({ ...playerA, score: 0 });
  };
  return (
    <div className="game-style">
      <div className="user-game-style">
        <h2>
           Player A : {playerA.score}
          {playerA.turn ? " is playing" : " is watching"}
        </h2>
      </div>
     

      <div className="image-grid">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            {card.right ? (
              <img className="front flipped" src={card.src} alt="Card front" />
            ) : (
              <img
                className="back flipped"
                src={require('../../image/back-Card.jpg')}
                onClick={() => {
                  handleTurns(card);
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
        <h2>
           Player B : {playerB.score}
          {playerB.turn ? " is playing" : " wait your turn ..."}
        </h2>
      </div>
    </div>
  );
}

export default DuoGame;
