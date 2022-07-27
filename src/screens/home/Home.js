import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import {
  Card,
  CardContent,
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
import { Button } from "@material-ui/core";
import "../../assets/no-results.png";


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
  gridListMain: {
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  formControls: {
    minWidth: 240,
    maxWidth: 240,
    margin: theme.spacing.unit,
  }
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
  const [upComingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);  
  const [movieNameFilter, setMovieNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState([]);
  const [artistFilter, setartistFilter] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  

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

      setGenres(genreDataResponse.genres);
      setArtists(artistsDataResponse.artists);
    };

    fetchData();
  }, []);
  
  function onArtistsFilterChangeHandler(e) {
    const {target : {value}} = e;
    setartistFilter(typeof value === 'string' ? value.split(",") : value)
  }

  function onGenreFilterChangeHandler(e) {
    const {target : {value}} = e;
    setGenreFilter(typeof value === 'string' ? value.split(",") : value)
  }

  function onReleaseMoviesClickHandler(id) {
    props.history.push("/movie/" + id);
  }

  function onMovieNameChangeHandler(e) {
    setMovieNameFilter(e.target.value);
  }

  function onReleaseStartDateChangeHandler(e) {
    setStartDateFilter(e.target.value);
  }

  function onReleaseEndDateHandler(e) {
    setEndDateFilter(e.target.value);
  }


  async function onApplyButtonClickHandler(){
    if(movieNameFilter === "" && genreFilter === "" && artistFilter === "" && startDateFilter === "" && endDateFilter === "") return;
    console.log(startDateFilter , endDateFilter , genreFilter, artistFilter);

    let url = props.baseUrl + "/movies?status=RELEASED"

    if(movieNameFilter !== null) {
        url = url + "&title=" + movieNameFilter;
    }

    if(genreFilter !== null) {
        url =  url + "&genre=" + genreFilter.join(",");
    }

    if(artistFilter !== null) {
        url =  url + "&artists=" + artistFilter.join(",");
    }

    if(startDateFilter !== null) {
        url = url + "&start_date=" + startDateFilter;
    }

    if(endDateFilter !== null) {
        url = url + "&end_date=" + endDateFilter;
    }

    try {
        const rawResponse = await fetch(encodeURI(url), {
            method:"GET",
            headers: {
                "Accept":"application/json;charset=UTF-8"
            }
        });
        const data = await rawResponse.json();
        if(rawResponse.ok) {
            setReleasedMovies(data.movies);
        } else {
            new Error("Unable to filter movies")
        }
        
    } catch(e) {
        console.log("Issue with getting the movies list as per the filter. ")
    }
  }
  
  return (
    <React.Fragment>
      <Header baseUrl={props.baseUrl}></Header>
      <div className="upcoming-movies">Upcoming Movies</div>

      <div className={classes.root}>
        <GridList className={classes.gridList} cols={6} cellHeight={250}>
          {upComingMovies.map((movie) => (
            <GridListTile key={movie.id}>
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="poster"
              />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className="flex-container">
        <div className="released-movies">
          <GridList
            className={classes.gridListMain}
            cols={4.5}
            cellHeight={350}
          >
            {releasedMovies.map((movie) => (
              <GridListTile
                key={movie.id}
                onClick={() => onReleaseMoviesClickHandler(movie.id)}
              >
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="poster"
                />
                {/* <ImageWithFallback fallback={"../../assets/no-results.png"} src={movie.poster_url} alt={movie.title}></ImageWithFallback> */}
                <GridListTileBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date :{" "}
                      {new Date(movie.release_date).toDateString()}
                    </span>
                  }
                />
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
                <Input id="movie-name" type="text" onChange={onMovieNameChangeHandler}></Input>
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControls}>
                <InputLabel htmlFor="genres">Genres</InputLabel>
                <Select
                  multiple
                  value={genreFilter}
                  label="Genres"
                  input={<Input id="genres" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  onChange={onGenreFilterChangeHandler}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox 
                        checked={genreFilter.indexOf(genre.genre) > -1}
                      />
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
                  value={artistFilter}
                  label="Artists"
                  MenuProps={MenuProps}
                  input={<Input id="artists" />}
                  renderValue={(selected) => selected.join(", ")}
                  onChange={onArtistsFilterChangeHandler}
                >
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        checked={
                          artistFilter.indexOf(
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
                  onChange={onReleaseStartDateChangeHandler}
                ></TextField>
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControls}>
                <TextField
                  type="date"
                  label="Release Date End"
                  InputLabelProps={{ shrink: true }}
                  onChange={onReleaseEndDateHandler}
                ></TextField>
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControls}>
                <Button
                  style={{ margin: "0 5px" }}
                  variant="contained"
                  color="primary"
                  onClick={onApplyButtonClickHandler}
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
