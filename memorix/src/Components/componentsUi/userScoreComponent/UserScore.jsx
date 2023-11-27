import React from "react";

function UserScore({ player, t, whichPlayer, duo = false }) {
  const myComponentStyle = {
    borderRadius: "5px",
    padding: "5px",
    boxShadow: "0px 0px 20px black",
    width: 150,
    height: 70,
    alignSelf: "center",
    backgroundColor: player.turn?"#24afa2":"grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  };
  return (
    <div className="user-game-style">
      <div style={myComponentStyle}>
        <h2 style={{ fontSize: 17 }}>
          {duo && t("player")} {whichPlayer} : {player.score}
        </h2>
      </div>
    </div>
  );
}

export default UserScore;
