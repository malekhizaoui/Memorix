import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexWrap: "wrap",
    // maxWidth: 345,
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
    const shuffledCards = [...anime.personnages, ...anime.personnages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setPersonnages(shuffledCards);
  };

  useEffect(() => {
    console.log("modesssfromcard", mode);

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
          : navigate("/JoinRoom");
        }
        else{
          navigate("/GameMode")
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
