import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './localGame.css'

const states = {
  // Cartes du jeu
  cards: [
    {
      src: "noelle.jpg",   // Image de la première carte
      name: "noelle",      // Nom de la première carte
      right: true          // Indique si la première carte est correctement associée
    },
    {
      src: "noelle.jpg",   // Image de la deuxième carte (même image que la première)
      name: "noelle",      // Nom de la deuxième carte (même nom que la première)
      right: true          // Indique si la deuxième carte est correctement associée
    },
    {
      src: "finral.jpg",   // Image de la troisième carte
      name: "finral",      // Nom de la troisième carte
      right: true          // Indique si la troisième carte est correctement associée
    },
    {
      src: "finral.jpg",   // Image de la quatrième carte (même image que la troisième)
      name: "finral",      // Nom de la quatrième carte (même nom que la troisième)
      right: false         // Indique que la quatrième carte n'est pas correctement associée
    },
    // ... Ajoutez d'autres cartes ici
  ],

  // Nombre de tours effectués
  turns: 5,             // Le nombre de tours déjà joués

  // Choix du joueur (pour les cartes retournées)
  choix1: "kil.jpg",    // Première carte choisie par l'utilisateur
  choix2: null,         // Deuxième carte choisie par l'utilisateur (pas encore choisie)

  // Nombre de cartes déjà retournées en face visible
  done: 1               // Le nombre de cartes déjà retournées en face visible
};
console.log(states);
function SoloGame() {
  const location = useLocation();
  const [turns, setTurns] = useState(0);
  const [done, setDone] = useState(0);
  const [choix1, setChoix1] = useState(null);
  const [choix2, setChoix2] = useState(null);
  const [cards, setCards] = useState([
    ...location.state,
  ]);

  const handleTurns = (card) => {
    choix1 ? setChoix2(card.src) : setChoix1(card.src);
    console.log("card", card);
    const newCards=cards.map((element,idx)=>{
        if(element.id===card.id){
            return {...element,right:true}
        }
        return element
    })
    if(choix1){

        setCards(newCards)
        setChoix2(card.src)
    }
    else{
        setChoix1(card.src)
        setCards(newCards)

    }
  };

 const resetTurns = ()=>{
    setChoix1(null);
    setChoix2(null);
 }

  const checkTurns = () => {  
    if(done===6){
        alert("you finish")
    }
    if (choix1 && choix2) {
      if (choix1 !== choix2) {
        
        setTimeout(() => {
            setCards(
                cards.map((element, idx) => {
                  if (element.src === choix1 || element.src === choix2) {
                    return { ...element, right: false };
                  }
                  return element;
                })
              );
            resetTurns()
            setTurns((count)=>count+1)
        }, 300);
      } else {
        setTimeout(() => {
            resetTurns()
            setTurns((count)=>count+1)
            setDone((count)=>count+1)

        }, 300);}
    }
  };

  useEffect(() => {
    console.log("location", location);
   
    checkTurns();
  }, [choix1, choix2]);

  const shuffleCard = () => {
    const shuffledCards = [
      ...location.state,
    ]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffledCards);
    setTurns(0);
    setDone(0)

  };

  return (
    <div className="game-style-solo">
      <div>
        <h2>Turns : {turns} </h2>
      </div>
      
      <div className="image-grid">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            {card.right ? (
              <img className="front" src={card.src} alt="Card front" />
            ) : (
              <img
                className="back"
                src={require('../../image/backgrounds/back-Card.jpg')}
                onClick={() => {
                  handleTurns(card);
                }}
                alt="Card back"
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={shuffleCard}>newGame</button>

    </div>
  );
}

export default SoloGame;
