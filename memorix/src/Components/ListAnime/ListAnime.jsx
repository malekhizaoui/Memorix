import React, { useEffect } from "react";
import Card from "./Card";
import { useLocation } from "react-router-dom";
import data from "../../data/data";
import './card.css'
function ListAnime() {
  const location = useLocation();
  const mode = location.state && location.state.mode;
  useEffect(() => {
    console.log("mode", location.state);
  }, []);
  return (
    <div>
      <h1>choose your Anime</h1>
      <div class="listAnime-container">

      {data.map((anime, index) => {
        return (
          <Card
            anime={anime}
            key={index}
            mode={
              mode === "duo"
                ? { mode: "duo" }
                : mode === "solo"
                ? { mode: "solo" }
                : mode === "multijoueur"
                ? { mode: "multijoueur" }
                : "multijoueur"
            }
          />
        );
      })}
    </div>
    </div>
  );
}

export default ListAnime;
