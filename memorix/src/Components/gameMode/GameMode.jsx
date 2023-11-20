import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GameMode.css";
import { useTranslation } from "react-i18next";

function GameMode({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const fromListAnime = location.state && location.state;
  console.log("fromListAnime", fromListAnime);
  const choosMultiPlayer = () => {
    if (isLoggedIn) {
      if (fromListAnime) {
        navigate("/JoinRoom", { state: fromListAnime });
      } else {
        navigate("/ListAnime", { state: { mode: "multijoueur" } });
      }
    } else {
      navigate("/Auth", { state: { mode: "multijoueur" } });
    }
  };

  const chooseSolo = () => {
    if (fromListAnime) {
      navigate("/SoloGame", { state: fromListAnime });
    } else {
      navigate("/ListAnime", { state: { mode: "solo" } });
    }
  };

  const chooseDuo = () => {
    if (fromListAnime) {
      navigate("/DuoGame", { state: fromListAnime });
    } else {
      navigate("/ListAnime", { state: { mode: "duo" } });
    }
  };

  return (
    <div class="gameMode-container">
      <div class="container">
        <div class="wrapper">
          <div class="banner-image" id="solo-image">
            <h1 className="mode-name"> SOLO</h1>
          </div>

          <div class="button-wrapper">
            <p>{t("descriptionSolo")}</p>
            <button type="button" onClick={chooseSolo} class="btn outline">
              {t("play")}
            </button>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="wrapper">
          <div class="banner-image" id="duo-image">
            <h1 className="mode-name">DUO</h1>
          </div>

          <div class="button-wrapper">
            <p>
              {t("descriptionDuo")}
              <br />
            </p>
            <button onClick={chooseDuo} type="button" class="btn outline">
              {t("play")}
            </button>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="wrapper">
          <div class="banner-image" id="multijoueur-image">
            <h1 className="mode-name">{t("multijoueur")}</h1>
          </div>

          <div class="button-wrapper">
            <p>{t("descriptionMultijoueur")}</p>
            <button
              onClick={choosMultiPlayer}
              type="button"
              class="btn outline"
            >
              {t("play")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameMode;
