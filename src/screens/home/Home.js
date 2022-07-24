import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import PropTypes from "prop-types";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import '../../assets/no-results.png';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  });



function Home(props) {

  const { classes } = props;
  const [movies, setMovies] = useState([]);
  const [upcComingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);

  useEffect(() => {
    fetch(props.baseUrl + "movies?page=1&limit=30", {
      method: "GET",
      headers: {
        Accept: "application/json;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.movies);
        setMovies(data.movies);

        const upcoming = data.movies.filter((movie) => {
            return movie.status === "PUBLISHED";
        })

        const released = data.movies.filter((movie) => {
            return movie.status === "RELEASED"
        })

        setUpcomingMovies(upcoming);
        setReleasedMovies(released);
      });
  }, []);

  return (
    <React.Fragment>
      <Header baseUrl={props.baseUrl}></Header>
      <div className="upcoming-movies">Upcoming Movies</div>

      <div className={classes.root}>
        <GridList className={classes.gridList} cols={5} cellHeight={250}>
          {upcComingMovies.map((movie) => (
            <GridListTile key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <GridListTileBar title={movie.title}/>
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className="flex-container">
        <div className="released-movies">
        <GridList className={classes.gridList} cols={4} cellHeight={350}>
          {releasedMovies.map((movie) => (
            <GridListTile key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <GridListTileBar title={movie.title}/>
            </GridListTile>
          ))}
        </GridList>
        </div>
        <div className="filter-section">
            FILTER SECTION
        </div>
      </div>
    </React.Fragment>
  );
}


export default withStyles(styles)(Home);