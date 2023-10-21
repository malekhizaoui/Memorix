import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './localGame.css'
import { useTranslation } from 'react-i18next';
import Modal from "../modeEnLigne/Modal";
import { useNavigate } from "react-router-dom";

function SoloGame() {
  const location = useLocation();
  const [turns, setTurns] = useState(0);
  const navigate = useNavigate();
  const [done, setDone] = useState(0);
  const [choix1, setChoix1] = useState(null);
  const [choix2, setChoix2] = useState(null);
  const [cards, setCards] = useState([
    ...location.state,
  ]);
  const { t } = useTranslation();
  const [modalFinish,setModalFinish]=useState(false)

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
        setModalFinish(true)
        resetTurns()
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

  const replay=()=>{
    resetTurns()
    setModalFinish(false)
    shuffleCard()
  }
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
        <h2>{t('turn')} : {turns} </h2>
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

                {modalFinish?<Modal>
                  <div>
                  <h1>you lost</h1>

                  <button style={{ marginRight: 5 }} onClick={()=>{replay()}}>
                    rejouer
                  </button>
                  <button style={{ marginRight: 5 }} onClick={()=>{navigate('/')}}>
                    quitter le jeu
                  </button>
                </div>
                </Modal>:null}
    </div>
  );
}

export default SoloGame;
