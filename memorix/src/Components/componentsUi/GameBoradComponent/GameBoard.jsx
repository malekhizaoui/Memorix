import React from 'react'
import { useTranslation } from 'react-i18next';
import CardAvatar from '../cardComponent/CardAvatar';
function GameBoard({handleTurns,cards,solo=true,shuffleCard}) {
  const {t}=useTranslation()
  return (
    <div className="image-grid">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <CardAvatar isVisible={card.right} src={card.image} onClick={()=>{handleTurns(card)}} />

            {/* {card.right ? 
            (
              <img className="front" src={card.image} alt="Card front" />
            ) : (
              <img
                className="back"
                src={require('../../image/backgrounds/back-Card.jpg')}
                onClick={() => {
                  handleTurns(card);
                }}
                alt="Card back"
              />
            )
            
            } */}
          </div>
        ))}
        
        {!solo&&<><h1></h1><button style={{marginTop:10}} onClick={shuffleCard}>{t('newGame')}</button></>}
      </div>
  )
}

export default GameBoard