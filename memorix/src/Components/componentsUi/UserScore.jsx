import React from 'react'

function UserScore({player,t,whichPlayer,duo=false}) {
  return (
    <div className="user-game-style">
    <h2>
    {duo && t("player")}  {whichPlayer} : {player.score}
      {/* {player.turn ? t("isPlay") : t("waitTurn")} */}
    </h2>
  </div>
  ) 
}

export default UserScore