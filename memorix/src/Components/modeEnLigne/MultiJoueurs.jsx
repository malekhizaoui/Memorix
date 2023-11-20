import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import "./onlineGame.css";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./chat.css";
import GameBoard from "../componentsUi/GameBoard";
import CheckWinner from "../componentsUi/CheckWinner";
import UserScore from "../componentsUi/UserScore";
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
      {mainPlayer.score + enemyPlayer.score === 6 ? (
        <>
          {enemyPlayer.score > mainPlayer.score ? (
            <Modal>
              <CheckWinner isWinner={"you lost"} shuffleCard={shuffleCard} />
            </Modal>
          ) : enemyPlayer.score < mainPlayer.score ? (
            <Modal>
              <CheckWinner isWinner={"you won"} shuffleCard={shuffleCard} />
            </Modal>
          ) : (
            <Modal>
              <CheckWinner isWinner={"Draw"} shuffleCard={shuffleCard} />
            </Modal>
          )}
        </>
      ) : null}
      {newGameModal ? (
        <Modal>
          <CheckWinner
            isWinner={"your enemy want to play another game with you"}
            shuffleCard={shuffleCard}
          />
        </Modal>
      ) : null}
      <UserScore player={mainPlayer} whichPlayer={"My score"} t={t}/>
      <GameBoard
        cards={cards}
        handleTurns={handleTurns}
        solo={false}
        shuffleCard={shuffleCard}
      />
      <UserScore player={enemyPlayer} whichPlayer={"Enemy score"} t={t}/>
      <div className="gameContainer">
        <Window>
          <MessageList
            disableDateSeparator
            closeReactionSelectorOnClick
            hideDeletedMessages
            messageActions={["react"]}
          />
          <MessageInput />
        </Window>
      </div>
    </div>
  );
}

export default MultiJoueurs;
