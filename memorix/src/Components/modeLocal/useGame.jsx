import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./localGame.css";
import { useTranslation } from "react-i18next";
export const useGame = (solo = false) => {
  const location = useLocation();
  const [playerA, setPlayerA] = useState({ turn: true, score: 0 });
  const [playerB, setPlayerB] = useState({ turn: false, score: 0 });
  const [done, setDone] = useState(0);
  const [choix1, setChoix1] = useState(null);
  const [choix2, setChoix2] = useState(null);
  const [cards, setCards] = useState([...location.state]);
  const { t } = useTranslation();
  const [modalFinish, setModalFinish] = useState(false);
  const [turns, setTurns] = useState(0);

  const handleTurnsDuo = (card) => {
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
      if (choix1) {
        setCards(newCards);
        setChoix2(card.src);
      } else {
        setChoix1(card.src);
        setCards(newCards);
      }
    }
  };

  const resetTurns = () => {
    setChoix1(null);
    setChoix2(null);
  };

  const checkWinner = () => {
    if (done === 6) {
      if (playerA.score > playerB.score) {
        setModalFinish(true);
      } else if (playerA.score < playerB.score) {
        setModalFinish(true);
      } else {
        setModalFinish(true);
      }
    }
  };
  const checkTurns = () => {
    checkWinner();
    checkCardsRotate();
  };
  const checkCardsRotate = () => {
    if (choix1 && choix2) {
      if (choix1 !== choix2) {
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
  };
  const replay = () => {
    resetTurns();
    setModalFinish(false);
    shuffleCard();
  };
  const shuffleCard = () => {
    const shuffledCards = [...location.state]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffledCards);
    setDone(0);

    if (!solo) {
      setPlayerB({ ...playerB, score: 0 });
      setPlayerA({ ...playerA, score: 0 });
    } else {
      setTurns(0);
    }
  };

  const handleTurnsSolo = (card) => {
    choix1 ? setChoix2(card.src) : setChoix1(card.src);
    const newCards = cards.map((element, idx) => {
      if (element.id === card.id) {
        return { ...element, right: true };
      }
      return element;
    });
    if (choix1) {
      setCards(newCards);
      setChoix2(card.src);
    } else {
      setChoix1(card.src);
      setCards(newCards);
    }
  };
  useEffect(() => {
    if (solo) {
      checkTurnsSolo();
    } else {
      checkTurns();
    }
  }, [choix1, choix2]);
  const checkTurnsSolo = () => {
    if (done === 6) {
      setModalFinish(true);
      resetTurns();
    }
    if (choix1 && choix2) {
      if (choix1 !== choix2) {
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
          setTurns((count) => count + 1);
        }, 500);
      } else {
        setTimeout(() => {
          resetTurns();
          setTurns((count) => count + 1);
          setDone((count) => count + 1);
        }, 500);
      }
    }
  };
  return {
    replay,
    playerA,
    playerB,
    modalFinish,
    shuffleCard,
    cards,
    t,
    turns,
    handleTurnsDuo,
    handleTurnsSolo,
  };
};
