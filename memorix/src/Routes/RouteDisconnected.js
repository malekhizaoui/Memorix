// Import React Router-Dom
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import React from "react";

//Import Components
import SoloGame from "../Components/modeLocal/SoloGame";
import Acceuil from "../Components/accueil/Acceuil";
import GameMode from "../Components/gameMode/GameMode";
import ListAnime from "../Components/ListAnime/ListAnime";
import DuoGame from "../Components/modeLocal/DuoGame";
import AuthUser from "../Components/Auth/AuthUser";
function RouteDisconnected({isLoggedIn,setIsLoggedIn}) {
 
  return (
      <Routes>
        <Route path="/" exact element={<Acceuil />} />
        <Route path="/Auth"  element={<AuthUser setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/GameMode" element={<GameMode isLoggedIn={isLoggedIn}/>} />
        <Route path="/ListAnime" element={<ListAnime/>} />
        <Route path="/SoloGame" element={<SoloGame/>} />
        <Route path="/DuoGame" element={<DuoGame/>} />
      </Routes>
  );
}

export default RouteDisconnected;
