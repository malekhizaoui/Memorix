import React from 'react'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
function CheckWinner({isWinner,shuffleCard,duo=false,replay}) {
    const navigate = useNavigate();
    const {t}=useTranslation()
  return (
    <div>
    <h1>{isWinner}</h1>

    <button style={{ marginRight: 5 }} onClick={!duo? shuffleCard:replay}>
      {t('replay')}
    </button>
    <button
      style={{ marginRight: 5 }}
      onClick={() => {
        navigate("/");
      }}
    >
        {t('quitGame')}
    </button>
  </div>
  )
}

export default CheckWinner