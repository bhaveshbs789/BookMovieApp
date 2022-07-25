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
import {Button} from "@material-ui/core";
import "../../assets/no-results.png";
// import { useHistory } from "react-router-dom";

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
    transform: "translateZ(0)",
  },
  gridListMain : {
    transform:"translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light,
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


function ImageWithFallback({ fallback, src, ...props }) {
    const [imgSrc, setImgSrc] = useState(src);
    const onError = () => setImgSrc(fallback);
  
    return <img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />;
  }

function Home(props) {
  const { classes } = props;
  const [movies, setMovies] = useState([]);
  const [upcComingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

  // const history = useHistory();

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

  function onReleaseMoviesClickHandler(id) {
    
    // console.log("Movie icon clicked");
    // console.log(id);
    // console.log(props);
    props.history.push('/movie/' + id);
    // history.push('/movie/' + id);
    
  }

  return (
    <React.Fragment>
      <Header baseUrl={props.baseUrl}></Header>
      <div className="upcoming-movies">Upcoming Movies</div>

      <div className={classes.root}>
        <GridList className={classes.gridList} cols={6} cellHeight={250}>
          {upcComingMovies.map((movie) => (
            <GridListTile key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} className="poster"/>
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className="flex-container">
        <div className="released-movies">
          <GridList className={classes.gridListMain} cols={4.5} cellHeight={350}>
            {releasedMovies.map((movie) => (
              <GridListTile key={movie.id} onClick={() => onReleaseMoviesClickHandler(movie.id)}>
                <img src={movie.poster_url} alt={movie.title} className="poster"/>
                {/* <ImageWithFallback fallback={"../../assets/no-results.png"} src={movie.poster_url} alt={movie.title}></ImageWithFallback> */}
                <GridListTileBar title={movie.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="filter-section">
          <Card>
            <CardContent>
              <Typography className={classes.title}>
                FIND MOVIES BY :
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
              <br/><br/>
              <FormControl className={classes.formControls}>
                <Button
                    style={{ margin: "0 5px" }}
                    variant="contained"
                    color="primary"
                >
                    APPLY
                </Button>
              </FormControl>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(Home);
