import classNames from "classnames";
import React from "react";
import './cardAvatar.css'
function CardAvatar({ isVisible, ...props }) {
  return (
    <div className={classNames("flip-card",{"flip-card-visible":isVisible})}>
      <div className="flip-card-inner">

        <div className="flip-card-front" >
          <img className="front" {...props} alt="Card front" />
        </div>
        <div className="flip-card-back">
          <img
            {...props}
            className="back"
            src={require("../../../image/backgrounds/back-Card.jpg")}
            alt="Card back"
          />
        </div>
      </div>
    </div>
  );
}

export default CardAvatar;
