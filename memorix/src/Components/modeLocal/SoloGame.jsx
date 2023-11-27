import React from "react";
import "./localGame.css";
import Modal from "../componentsUi/modalComonent/Modal";
import { useGame } from "./useGame";
import GameBoard from "../componentsUi/GameBoradComponent/GameBoard";
import CheckWinner from "../componentsUi/CheckWinnerComponent/CheckWinner";
function SoloGame() {
  const { replay, modalFinish, shuffleCard, handleTurnsSolo, cards, t, turns } =
    useGame(true);

  return (
    <div className="game-style-solo">
      <div>
        <h2>
          {t("turn")} : {turns}
        </h2>
      </div>
      <GameBoard cards={cards} handleTurns={handleTurnsSolo} />

      <button onClick={shuffleCard}>{t('newGame')}</button>

      {modalFinish ? (
        <Modal>
          <CheckWinner
            isWinner={t("finishGame")}
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
