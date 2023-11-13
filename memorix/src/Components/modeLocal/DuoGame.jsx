import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './localGame.css'
import Modal from "../modeEnLigne/Modal";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

function DuoGame() {
  const location = useLocation();
  const [playerA, setPlayerA] = useState({ turn: true, score: 0 });
  const [playerB, setPlayerB] = useState({ turn: false, score: 0 });
  const [done, setDone] = useState(0);
  const [choix1, setChoix1] = useState(null);
  const [choix2, setChoix2] = useState(null);
  const [cards, setCards] = useState([...location.state]);
  const { t } = useTranslation();
  const [modalFinish,setModalFinish]=useState(false)
  const navigate = useNavigate();

 

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
    checkTurns();
  }, [choix1, choix2]);


  const resetTurns = () => {
    setChoix1(null);
    setChoix2(null);
  };

  const checkWinner=()=>{
    if (done === 6) {
      if (playerA.score > playerB.score) {
        setModalFinish(true)
      } else if (playerA.score < playerB.score) {
        setModalFinish(true)
      } else {
        setModalFinish(true)
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
        }, 500);
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
  const replay=()=>{
    resetTurns()
    setModalFinish(false)
    shuffleCard()
  }
  const shuffleCard = () => {
    const shuffledCards = [...location.state]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffledCards);
    // setTurns(0);
    setDone(0);
    setPlayerB({ ...playerB, score: 0 });
    setPlayerA({ ...playerA, score: 0 });
  };
  return (
    <div className="game-style">
      <div className="user-game-style">
        <h2>
           {t("player")} A : {playerA.score}{" "}
          {playerA.turn ? t('isPlay') : t("waitTurn")}
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
                src={require('../../image/backgrounds/back-Card.jpg')}
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
           {t('player')}  B : {playerB.score}{" "}
          {playerB.turn ? t('isPlay') : t("waitTurn")}
        </h2>
      </div>
      {
        modalFinish?(
        <Modal>
          <div>
                  <h1>{playerA.score>playerB.score?"Player A is the winner"
                    :playerA.score===playerB.score?
                  "Draw":"Player B is the winner"}</h1>

                  <button style={{ marginRight: 5 }} onClick={()=>{replay()}}>
                    rejouer
                  </button>
                  <button style={{ marginRight: 5 }} onClick={()=>{navigate('/')}}>
                    quitter le jeu
                  </button>
                </div>
        </Modal>):null
      }
    </div>
  );
}

export default DuoGame;
