import React, { useContext, useState, useEffect } from "react";
import API from "../../API";
import PropTypes from 'prop-types';
//Components
import Thumb from '../Thumb'
import Rate from "../Rate";
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//Image
import NoImage from '../../images/no_image.jpg';
//Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';
//Context
import { Context } from '../../context';

const MovieInfo = ({ movie }) => {
    const [user] = useContext(Context);
    const [userRating, setUserRating] = useState('');
    const [updateUserRating, setUpdateUserRating] = useState(true);
    const [available, setAvailable] = useState(false);

    const handleRating = async value => {
        const rate = await API.rateMovie(user.sessionId, movie.id, value);
        setUpdateUserRating(true);
        console.log(rate)
    }

    useEffect(() => {
        let availableOn = API.fetchStreamServices(movie.id)
    availableOn
    .then((result) => {
        console.log(result)
        setAvailable(result)
    })

        const getUserRating = async () => {
            if(user) {
            const ratings = await API.fetchRating(user.sessionId)
            const thisMovie = ratings.results.find(el => el.id === movie.id);
            const userRating = thisMovie.rating;
            return userRating
            } else {
                console.log('Not Logged in')
            }
        };

        if (updateUserRating) {
            getUserRating().then(result => {
                setUserRating(result);
            }, function(error) {
                setUserRating('N/A');
            });

            setUpdateUserRating(false);
        };

        
    },[movie.id, setUserRating, updateUserRating, user, userRating])




return (
    <Wrapper backdrop={movie.backdrop_path}>
        <Content>
            <Thumb
            image={
                movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            clickable={false}
            />
            <Text>
                <h1>{movie.title}</h1>
                <h3>PLOT</h3>
                <p>{movie.overview}</p>

                <div className="rating-directors">
                    <div>
                        <h3>RATING</h3> 
                        <div className="score">{movie.vote_average}</div>
                    </div>
                    {user && (
                        <div>
                        <h3>MY RATING</h3> 
                        <div className="score">{userRating}</div>
                    </div>
                    )
                    }
                    <div className="director">
                        <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                        {//Maps through all the possible directors and adds a p tag for each director
                        movie.directors.map(director => (
                            <p key={director.credit_id}>{director.name}</p>
                        ))}
                    </div>
                </div>
                <div className="where-to-watch">
                    <h3 className="wtw-main-heading">Where to Watch</h3>
                    <h3 className="wtw-heading">Buy</h3>
                    <div className="where-to-buy">
                    {
                        available
                        ? 
                        available.results.US.buy
                        ? 
                        available.results.US.buy.map((el) => {
                            return <img className="service-logo" src={`https://www.themoviedb.org/t/p/original/${el.logo_path}`} alt="logo"/>
                        }) : <p className="not-available">Not Available</p>
                        : <p className="not-available">Not Available</p>
                    }
                    </div>

                    <h3 className="wtw-heading">Rent</h3>
                    <div className="where-to-rent">
                    {
                        available
                        ? 
                        available.results.US.rent
                        ? 
                        available.results.US.rent.map((el) => {
                            return <img className="service-logo" src={`https://www.themoviedb.org/t/p/original/${el.logo_path}`} alt="logo"/>
                        }) : <p className="not-available">Not Available</p>
                        : <p className="not-available">Not Available</p>
                    }
                    </div>

                    <h3 className="wtw-heading">Stream</h3>
                    <div className="where-to-stream">
                    {
                        available
                        ? 
                        available.results.US.flatrate
                        ? 
                        available.results.US.flatrate.map((el) => {
                            return <img className="service-logo" src={`https://www.themoviedb.org/t/p/original/${el.logo_path}`} alt="logo"/>
                        }) : <p className="not-available">Not Available</p>
                        : <p className="not-available">Not Available</p>
                    }
                    </div>
                </div>
                
                {user && (
                    <div>
                    <h3 className="rate-movie">Rate Movie</h3>
                    <Rate callback={handleRating}/>
                </div>
                )}
            </Text>
        </Content>
    </Wrapper>
);
                        };
MovieInfo.propTypes = {
    movie: PropTypes.object,
}

export default MovieInfo;