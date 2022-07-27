import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import Header from "../../common/header/Header";
import "./Details.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { GridList } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
import { GridListTileBar } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { ListSubheader } from "@material-ui/core";

const styles = (theme) => ({
  gridList: {
    flexWrap: "wrap",
    transform: "translateZ(0)",
  },
});

function ImageRender(props) {
  return <img src={props.posterSource} alt={props.altDetails}></img>;
}

const Details = function (props) {
  const [movieDetails, setMovieDetails] = useState({});
  const [stars, setStars] = useState([
    {
      id: 1,
      color: "black",
    },
    {
      id: 2,
      color: "black",
    },
    {
      id: 3,
      color: "black",
    },
    {
      id: 4,
      color: "black",
    },
    {
      id: 5,
      color: "black",
    },
  ]);

  const { classes } = props;

  useEffect(() => {
    const fetchMovieData = async () => {
      const rawResponse = await fetch(
        props.baseUrl + "movies/" + props.match.params.id,
        {
          method: "GET",
          headers: {
            Accept: "application/json;charset=UTF-8",
          },
        }
      );

      const data = await rawResponse.json();
      setMovieDetails({ ...data });
    };

    fetchMovieData();
  }, []);

  useEffect(() => {}, [stars]);

  const opts = {
    height: "490",
    width: "640",
    playerVars: {
      autoPlay: 0,
      origin: "http://localhost:3000",
    },
  };

  const starIconClickHandler = (id) => {
    const newStarIcons = [];
    for (let star of stars) {
      let starIcon = star;

      if (star.id <= id) {
        starIcon.color = "yellow";
      } else {
        star.color = "black";
      }
      newStarIcons.push(starIcon);
    }
    setStars(newStarIcons);
  };

  return (
    <div>
      <Header
        baseUrl={props.baseUrl}
        showBookShowButton="true"
        movieId={props.match.params.id}
      ></Header>
      <div className="back-to-home">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography>&#60; Back to Home</Typography>
        </Link>
      </div>
      <div className="details-container">
        <div className="left-section">
          <ImageRender
            posterSource={movieDetails.poster_url}
            altDetails={movieDetails.title}
          ></ImageRender>
        </div>
        <div className="middle-section">
          <div>
            <Typography variant="headline" component="h2">
              <span>{movieDetails.title}</span>
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <span className="bold-text">Genres : </span>
              {movieDetails.genres && movieDetails.genres.join(", ")}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <span className="bold-text">Duration : </span>
              {movieDetails.duration} minutes
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <span className="bold-text">Release Date : </span>
              {new Date(movieDetails.release_date).toDateString()}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <span className="bold-text">Rating : </span>
              {movieDetails.rating}
            </Typography>
          </div>
          <div className="plot-text">
            <Typography variant="subtitle1">
              <span className="bold-text">Plot : </span>
              {
                <a href={movieDetails.wiki_url} target="_blank">
                  (Wiki Link)
                </a>
              }{" "}
              {movieDetails.storyline}
            </Typography>
          </div>
          <div className="plot-text">
            <Typography variant="subtitle1">
              <span className="bold-text">Trailer : </span>
              <YouTube
                videoId={
                  movieDetails.trailer_url &&
                  movieDetails.trailer_url.split("=")[1]
                }
                opts={opts}
              ></YouTube>
            </Typography>
          </div>
        </div>
        <div className="right-section">
          <div className="movie-rating-section">
            <Typography>
              <span className="bold-text">Rate this movie:</span>
            </Typography>
            {stars.map((star) => (
              <StarBorderIcon
                key={star.id}
                style={{ color: star.color }}
                onClick={() => starIconClickHandler(star.id)}
              ></StarBorderIcon>
            ))}
          </div>
          <div className="artist-section">
            <Typography>
              <span className="bold-text">Artists : </span>
            </Typography>
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={2} cellHeight={180}>
                <GridListTile cols={2} style={{ height: "auto" }}>
                  <ListSubheader component="div">Superstars</ListSubheader>
                </GridListTile>
                {movieDetails.artists &&
                  movieDetails.artists.map((artist) => (
                    <GridListTile key={artist.id} className="gridTile">
                      <img
                        src={artist.profile_url}
                        alt={artist.first_name + " " + artist.last_name}
                      />
                      <GridListTileBar
                        title={artist.first_name + " " + artist.last_name}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Details);
