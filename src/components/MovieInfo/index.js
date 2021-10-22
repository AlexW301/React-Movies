import React, { useContext, useState, useEffect } from "react";
import API from "../../API";
import PropTypes, { func } from 'prop-types';
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

    const handleRating = async value => {
        const rate = await API.rateMovie(user.sessionId, movie.id, value);
        setUpdateUserRating(true);
        console.log(rate)
    }

    useEffect(() => {
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
                setUserRating(error);
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