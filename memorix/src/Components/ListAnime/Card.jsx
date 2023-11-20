import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexWrap: "wrap",
    backgroundColor: "Transparent",
  },
  media: {
    height: 200,
    width: 400,
    backgroundColor: "Transparent",
  },
});

export default function MediaCard({ anime, mode }) {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [personnages, setPersonnages] = useState([]);

  const shuffleCard = () => {
    const cardsFirstHalf=anime.personnages.map((elem)=>{
      return {...elem,image:elem.images?.length>=1?elem.images[0]:elem.src}
    })
    const cardsSecondtHalf=anime.personnages.map((elem)=>{
      return {...elem,image:elem.images?.length>=2?elem.images[1]:elem.src}
    })
    const shuffledCards = [...cardsFirstHalf, ...cardsSecondtHalf]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setPersonnages(shuffledCards);
  };

  useEffect(() => {
    shuffleCard();
  }, []);

  return (
    <Card
      style={{
        flexWrap: "wrap",
        display: "inline-block",
        backgroundColor: "Transparent",
      }}
      onClick={() => {
        if(mode){
          mode.mode === "solo"
          ? navigate("/soloGame", { state: personnages })
          : mode.mode === "duo"
          ? navigate("/DuoGame", { state: personnages })
          : navigate("/JoinRoom", { state: personnages });
        }
        else{
          console.log("kb");
          navigate("/GameMode",{state:personnages})
        }
        
      }}
    >
      <CardActionArea
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          className={classes.media}
          image={anime.src}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {anime.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
