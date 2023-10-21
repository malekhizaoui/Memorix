import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import "./onlineGame.css";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function MultiJoueurs({ perssonages }) {
  const [cards, setCards] = useState(perssonages);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mainPlayer, setMainPlayer] = useState({ turn: true, score: 0 });
  const [enemyPlayer, setEnemyPlayer] = useState({ turn: true, score: 0 });
  const [newGameModal, setNewGameModal] = useState(false);
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
    if (mainPlayer.turn && !newGameModal) {
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
          }, 500);
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

  const shuffleCard = async () => {
    const shuffledCards = perssonages
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    console.log("newGameModal", !newGameModal);
    if (!newGameModal) {
      await channel.sendEvent({
        type: "request-new-Game",
        data: { gameModal: true },
      });
    } else {
      await channel.sendEvent({
        type: "new-Game",
        data: { shuffledCards },
      });
      setCards(shuffledCards);
      setMainPlayer({ turn: true, score: 0 });
      setEnemyPlayer({ turn: true, score: 0 });
      setNewGameModal(false);
    }
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
      if (event.type === "game-move" && event.user.id !== client.userID) {
        setCards(event.data.newCards);
        event.data.enemy && setMainPlayer({ ...mainPlayer, turn: false });
      }
      if (event.type === "reset-move" && event.user.id !== client.userID) {
        setCards(event.data.resetCard);
        setMainPlayer({ ...mainPlayer, turn: true });
        setEnemyPlayer({ ...enemyPlayer, turn: false });
      }
      if (event.type === "success-move" && event.user.id !== client.userID) {
        setEnemyPlayer({ ...enemyPlayer, score: event.data.enemyScore });
      }
      if (
        event.type === "request-new-Game" &&
        event.user.id !== client.userID
      ) {
        setNewGameModal(event.data.gameModal);
        setMainPlayer({ turn: true, score: 0 });
        setEnemyPlayer({ turn: true, score: 0 });
      }
      if (event.type === "new-Game" && event.user.id !== client.userID) {
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

        {mainPlayer.score + enemyPlayer.score === 6 ? (
          <>
            {enemyPlayer.score > mainPlayer.score ? (
              <Modal>
                <div>
                  <h1>you lost</h1>

                  <button style={{ marginRight: 5 }} onClick={shuffleCard}>
                    rejouer
                  </button>
                  <button style={{ marginRight: 5 }} onClick={()=>{navigate('/')}}>
                    quitter le jeu
                  </button>
                </div>
              </Modal>
              
            ) :enemyPlayer.score < mainPlayer.score ? (
              <Modal>
                <div>
                  <h1>you won</h1>

                  <button style={{ marginRight: 5 }} onClick={shuffleCard}>
                    rejouer
                  </button>
                  <button style={{ marginRight: 5 }} onClick={()=>{navigate('/')}}>
                    quitter le jeu
                  </button>
                </div>
              </Modal>
            ):
            <Modal>
                <div>
                  <h1>Draw</h1>

                  <button style={{ marginRight: 5 }} onClick={shuffleCard}>
                    rejouer
                  </button>
                  <button style={{ marginRight: 5 }} onClick={()=>{navigate('/')}}>
                    quitter le jeu
                  </button>
                </div>
              </Modal>
            }
          </>
        ) : null}


        {newGameModal ? (
          <Modal>
            <div>
              <h1>your enemy want to play onther game withou you</h1>

              <button style={{ marginRight: 5 }} onClick={shuffleCard}>
                rejouer
              </button>
            </div>
          </Modal>
        ) : null}
        {cards.map((card, index) => (
          <div className="card" key={index}>
            {card.right ? (
              <img className="front" src={card.src} alt="Card front" />
            ) : (
              <img
                className="back"
                src={require("../../image/backgrounds/back-Card.jpg")}
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
