import { Typography } from '@material-ui/core';
import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import Header from '../../common/header/Header';
import './Details.css';


function ImageRender(props) {
    
    return(
        <img src={props.posterSource} alt={props.altDetails}></img>
    )
}

const Details = function(props) {    

    const [movieDetails, setMovieDetails] = useState({});

    useLayoutEffect(() => {
        const fetchMovieData = async () => {
            const rawResponse = await fetch(props.baseUrl + "movies/" + props.match.params.id, {
                method: "GET",
                headers: {
                    "Accept":"application/json;charset=UTF-8"
                }
            })

            const data = await rawResponse.json();
            setMovieDetails({...data});
            // console.log(data);
        }
        
        fetchMovieData();        
    },[]);

    

    return (
        
        <div>
            <Header baseUrl={props.baseUrl}></Header>
            <div className='back-to-home'>
                <Link to="/" style={{textDecoration:'none'}}>
                    <Typography>
                        &#60; Back to Home
                    </Typography>
                </Link>                
            </div>
            <div className='details-container'>
                <div className='left-section'>
                    <ImageRender posterSource={movieDetails.poster_url} altDetails={movieDetails.title}></ImageRender>
                </div>
                <div className='middle-section'>
                    <div>
                        <Typography variant='headline' component="h2"><span>{movieDetails.title}</span></Typography>
                    </div>
                    <div>
                        <Typography variant='subtitle1'>
                            Genres : <span>{movieDetails.genres}</span></Typography>
                    </div>
                    <div>
                        <Typography variant='subtitle1'>
                            Duration : <span>{movieDetails.duration} minutes</span></Typography>
                    </div>
                    <div>
                        <Typography variant='subtitle1'>
                            Release Date : <span>{new Date(movieDetails.release_date).toDateString()}</span></Typography>
                    </div>
                    <div>
                        <Typography variant='subtitle1'>
                            Rating : <span>{movieDetails.rating}</span></Typography>
                    </div>
                    <div className='plot-text'>
                        <Typography variant='subtitle1'>
                            Plot : <span><a href={movieDetails.wiki_url} target="_blank">(Wiki Link)</a> {movieDetails.storyline}</span></Typography>
                    </div>
                    <div className='plot-text'>
                        <Typography variant='subtitle1'>
                            Trailer : <YouTube ></YouTube></Typography>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div className='right-section'>
                    RIGHT SECTION
                </div>
            </div>
        </div>
    )
}

export default Details;