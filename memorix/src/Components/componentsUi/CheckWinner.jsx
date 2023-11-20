import React from 'react'
import { useNavigate } from "react-router-dom";

function CheckWinner({isWinner,shuffleCard,duo=false,replay}) {
    const navigate = useNavigate();

  return (
    <div>
    <h1>{isWinner}</h1>

    <button style={{ marginRight: 5 }} onClick={!duo? shuffleCard:replay}>
      rejouer
    </button>
    <button
      style={{ marginRight: 5 }}
      onClick={() => {
        navigate("/");
      }}
    >
        Quitter le jeu
    </button>
  </div>
  )
}

export default CheckWinner