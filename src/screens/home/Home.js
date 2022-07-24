import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  GridList,
  GridListTile,
  GridListTileBar,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Checkbox,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import "../../assets/no-results.png";
import {Button} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  formControls: {
    minWidth: 240,
    maxWidth: 240,
    margin: theme.spacing.unit,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Home(props) {
  const { classes } = props;
  const [movies, setMovies] = useState([]);
  const [upcComingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rawResponseMovies = await fetch(
        props.baseUrl + "movies?page=1&limit=30",
        {
          method: "GET",
          headers: {
            Accept: "application/json;charset=UTF-8",
          },
        }
      );

      const moviesDataResponse = await rawResponseMovies.json();

      const rawArtistsData = await fetch(
        props.baseUrl + "artists?page=1&limit=50",
        {
          method: "GET",
          headers: {
            Accept: "application/json;charset=UTF-8",
          },
        }
      );

      const artistsDataResponse = await rawArtistsData.json();

      const rawGenreResponse = await fetch(props.baseUrl + "genres", {
        method: "GET",
        headers: {
          Accept: "application/json;charset=UTF-8",
        },
      });

      const genreDataResponse = await rawGenreResponse.json();

      setMovies(moviesDataResponse.movies);
      const upcoming = moviesDataResponse.movies.filter((movie) => {
        return movie.status === "PUBLISHED";
      });
      const released = moviesDataResponse.movies.filter((movie) => {
        return movie.status === "RELEASED";
      });
      setUpcomingMovies(upcoming);
      setReleasedMovies(released);

      console.log(genreDataResponse.genres);
      console.log(artistsDataResponse.artists);

      setGenres(genreDataResponse.genres);
      setArtists(artistsDataResponse.artists);
    };

    fetchData();

    // fetch(props.baseUrl + "movies?page=1&limit=30", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json;charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data);
    //     // console.log(data.movies);
    //     setMovies(data.movies);

    //     const upcoming = data.movies.filter((movie) => {
    //         return movie.status === "PUBLISHED";
    //     })

    //     const released = data.movies.filter((movie) => {
    //         return movie.status === "RELEASED"
    //     })

    //     setUpcomingMovies(upcoming);
    //     setReleasedMovies(released);
    //   });
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
              <GridListTileBar title={movie.title} />
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
                <GridListTileBar title={movie.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="filter-section">
          <Card>
            <CardContent>
              <Typography className={classes.title}>
                FIND MOVIES BY :{" "}
              </Typography>
              <FormControl className={classes.formControls}>
                <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
                <Input id="movie-name" type="text"></Input>
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControls}>
                <InputLabel htmlFor="genres">Genres</InputLabel>
                <Select
                  multiple
                  value={genres}
                  label="Genres"
                  MenuProps={MenuProps}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                      <ListItemText primary={genre.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControls}>
                <InputLabel htmlFor="artists">Artists</InputLabel>
                <Select
                  multiple
                  value={genres}
                  label="Genres"
                  MenuProps={MenuProps}
                >
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        checked={
                          artists.indexOf(
                            artist.first_name + " " + artist.last_name
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControls}>
                <TextField
                  type="date"
                  label="Release Date Start"
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControls}>
                <TextField
                  type="date"
                  label="Release Date End"
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              </FormControl>
              <Button
                style={{ margin: "0 5px" }}
                variant="contained"
                color="primary"
              >
                APPLY
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(Home);
