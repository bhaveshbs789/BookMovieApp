import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import PropTypes from 'prop-types';
import { GridList, GridListTile } from '@material-ui/core';

export default function Home(props) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(props.baseUrl + "movies",{
            method:"GET",
            headers: {
                "Accept":"application/json;charset=UTF-8"
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.movies)
            setMovies(data.movies);
        })
    }, []);

    return (
        <React.Fragment>
                <Header baseUrl={props.baseUrl}></Header>
                <div className='upcoming-movies'>
                    Upcoming Movies
                </div>

        </React.Fragment>
    )
}