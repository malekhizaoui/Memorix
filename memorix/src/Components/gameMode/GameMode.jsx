import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameMode.css";
import { useTranslation } from 'react-i18next';

function GameMode({ isLoggedIn }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              {t("descriptionSolo")}
            </p>
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
            <h1 className="mode-name">{t('multijoueur')}</h1>
          </div>

          <div class="button-wrapper">
            <p>
              {t('descriptionMultijoueur')}
            </p>
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
