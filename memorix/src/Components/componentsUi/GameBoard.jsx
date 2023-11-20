import React from 'react'

function GameBoard({handleTurns,cards,solo=true,shuffleCard}) {
  return (
    <div className="image-grid">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            {card.right ? (
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
            )}
          </div>
        ))}
        
        {!solo&&<><h1></h1><button onClick={shuffleCard}>newGame</button></>}
      </div>
  )
}

export default GameBoard