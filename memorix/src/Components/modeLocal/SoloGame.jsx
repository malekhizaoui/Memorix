import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./localGame.css";
import { useTranslation } from "react-i18next";
import Modal from "../modeEnLigne/Modal";
import { useGame } from "./useGame";
import { useNavigate } from "react-router-dom";
import GameBoard from "../componentsUi/GameBoard";
import CheckWinner from "../componentsUi/CheckWinner";
function SoloGame() {
  const { replay, modalFinish, shuffleCard, handleTurnsSolo, cards, t, turns } =useGame(true);
  
  return (
    <div className="game-style-solo">
      <div>
        <h2>
          {t("turn")} : {turns}{" "}
        </h2>
      </div>
      <GameBoard cards={cards} handleTurns={handleTurnsSolo} />

      <button onClick={shuffleCard}>newGame</button>

      {modalFinish ? (
        <Modal>
          <CheckWinner
            isWinner={"Congratulation you finish the Game"}
            shuffleCard={shuffleCard}
            replay={replay}
            duo={true}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default SoloGame;
