import React from "react";
import "./localGame.css";
import Modal from "../componentsUi/modalComonent/Modal";
import { useGame } from "./useGame";
import GameBoard from "../componentsUi/GameBoradComponent/GameBoard";
import CheckWinner from "../componentsUi/CheckWinnerComponent/CheckWinner";
import UserScore from "../componentsUi/userScoreComponent/UserScore";
function DuoGame() {
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
                ? t('playerAWin')
                : playerA.score === playerB.score
                ? t('draw')
                : t('playerBWin')
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
