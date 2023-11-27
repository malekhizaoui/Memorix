import React from "react";
import "./onlineGame.css";
import Modal from "../componentsUi/modalComonent/Modal";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./chat.css";
import GameBoard from "../componentsUi/GameBoradComponent/GameBoard";
import CheckWinner from "../componentsUi/CheckWinnerComponent/CheckWinner";
import UserScore from "../componentsUi/userScoreComponent/UserScore";
import useGame from "./useGame";
function MultiJoueurs({ perssonages }) {
  const {
    enemyPlayer,
    mainPlayer,
    t,
    handleTurns,
    shuffleCard,
    cards,
    newGameModal,
  } = useGame(perssonages);

  return (
    <div className="game-style">
      {mainPlayer.score + enemyPlayer.score === 6 ? (
        <>
          {enemyPlayer.score > mainPlayer.score ? (
            <Modal>
              <CheckWinner isWinner={t("lost")} shuffleCard={shuffleCard} />
            </Modal>
          ) : enemyPlayer.score < mainPlayer.score ? (
            <Modal>
              <CheckWinner isWinner={t("won")} shuffleCard={shuffleCard} />
            </Modal>
          ) : (
            <Modal>
              <CheckWinner isWinner={t("draw")} shuffleCard={shuffleCard} />
            </Modal>
          )}
        </>
      ) : null}
      {newGameModal ? (
        <Modal>
          <CheckWinner
            isWinner={t("enemyWantPlayAgain")}
            shuffleCard={shuffleCard}
          />
        </Modal>
      ) : null}
      <UserScore player={mainPlayer} whichPlayer={t("myScore")} t={t} />
      <GameBoard
        cards={cards}
        handleTurns={handleTurns}
        solo={false}
        shuffleCard={shuffleCard}
      />
      <UserScore player={enemyPlayer} whichPlayer={t("enemyScroe")} t={t} />
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
