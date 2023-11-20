import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./localGame.css";
import Modal from "../modeEnLigne/Modal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGame } from "./useGame";
import GameBoard from "../componentsUi/GameBoard";
import CheckWinner from "../componentsUi/CheckWinner";
import UserScore from "../componentsUi/UserScore";
function DuoGame() {
  const navigate = useNavigate();
  const {
    replay,
    playerA,
    playerB,
    modalFinish,
    shuffleCard,
    handleTurnsDuo,
    cards,
    t,
  } = useGame(false);
  console.log("modalFinish",modalFinish);
  return (
    <div className="game-style">
    
      <UserScore player={playerA}  t={t} whichPlayer={"A"} duo={true}/>
      <GameBoard
        cards={cards}
        handleTurns={handleTurnsDuo}
        solo={false}
        shuffleCard={shuffleCard}
      />
      <UserScore player={playerB}  t={t} whichPlayer={"B"} duo={true}/>
      {modalFinish ? (
        <Modal>
          <CheckWinner
            isWinner={
              playerA.score > playerB.score
                ? "Player A is the winner"
                : playerA.score === playerB.score
                ? "Draw"
                : "Player B is the winner"
            }
            shuffleCard={shuffleCard}
            replay={replay}
            duo={true}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default DuoGame;
