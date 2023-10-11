// Import React Router-Dom
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import React from 'react';

//Import Components
import JoinRoom from '../Components/modeEnLigne/JoinRoom'
import Acceuil from '../Components/accueil/Acceuil';
import GameMode from '../Components/gameMode/GameMode';
import ListAnime from '../Components/ListAnime/ListAnime';
import MultiJoueurs from '../Components/modeEnLigne/MultiJoueurs'
import SoloGame from '../Components/modeLocal/SoloGame';
import DuoGame from '../Components/modeLocal/DuoGame';
function RouteConnected({isLoggedIn}) {
 
  return (
  
        <Routes>
        <Route path="/" exact element={<Acceuil />} />
        <Route path="/GameMode" element={<GameMode isLoggedIn={isLoggedIn}/>} />
        <Route path="/ListAnime" element={<ListAnime/>} />
        <Route path="/MultiJoueurs" element={<MultiJoueurs />} />
        <Route path="/SoloGame" element={<SoloGame />} />
        <Route path="/DuoGame" element={<DuoGame />} />
        <Route path="/JoinRoom" element={<JoinRoom/>} />
        </Routes>
    )
}

export default RouteConnected