import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameMode.css";
function GameMode({ isLoggedIn }) {
  const navigate = useNavigate();
  const choosMultiPlayer = () => {
    if (isLoggedIn) {
      navigate("/ListAnime", { state: { mode: "multijoueur" } });
    } else {
      navigate("/Auth", { state: { mode: "multijoueur" } });
    }
  };

  const chooseSolo = () => {
    navigate("/ListAnime", { state: { mode: "solo" } });
  };

  const chooseDuo = () => {
    navigate("/ListAnime", { state: { mode: "duo" } });
  };

  return (
    <div class="gameMode-container">
      <div class="container">
        <div class="wrapper">
          <div class="banner-image" id="solo-image">
            <h1 className="mode-name"> SOLO</h1>
          </div>

          <div class="button-wrapper">
            <p>
              Mettez-vous au défi dans un jeu de mémoire en solo et battez vos
              propres scores pour devenir le maître de la mémoire !
            </p>
            <button type="button" onClick={chooseSolo} class="btn outline">
              JOUER
            </button>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="wrapper">
          <div class="banner-image" id="duo-image">
            <h1 className="mode-name"> DUO</h1>
          </div>

          <div class="button-wrapper">
            <p>
              Invitez un ami à se joindre à vous dans une compétition amicale de
              mémoire, où seule la meilleure paire de cerveaux l'emportera,{" "}
              <br />
            </p>
            <button onClick={chooseDuo} type="button" class="btn outline">
              JOUER
            </button>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="wrapper">
          <div class="banner-image" id="multijoueur-image">
            <h1 className="mode-name">Multijoueur en ligne</h1>
          </div>

          <div class="button-wrapper">
            <p>
              Connectez-vous et affrontez des adversaires du monde entier dans
              une bataille acharnée pour la suprématie de la mémoire en ligne !
            </p>
            <button
              onClick={choosMultiPlayer}
              type="button"
              class="btn outline"
            >
              JOUER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameMode;
