import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './accueil.css'
function Acceuil() {
    const navigate = useNavigate()

  return (
    <div className="homepage-container">
      <h1>Acceuil</h1>
      <h2>
      Voyagez avec distinction dans le monde captivant des animes, <br/>tout en soumettant votre mémoire à un défi exquis !      </h2>
      <button
        onClick={() => {
          navigate("/GameMode");
        }}
      >
        Start
      </button>
    </div>
  );
}

export default Acceuil;
