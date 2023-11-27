import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import './accueil.css'
function Acceuil() {
    const navigate = useNavigate()
    const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <h1>{t("acceuil")}</h1>
      <h2>{t("welcome")}</h2>
      <button onClick={() => {navigate("/GameMode");}}>
        {t('start')}
      </button>
    </div>
  );
}

export default Acceuil;
