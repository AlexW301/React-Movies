import React from "react";
import { useParams } from "react-router-dom";
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
//Components
import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";
//Hook
import { useMovieFetch } from "../hooks/useMovieFetch";
//Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
    // Below: Name "movieId" on line 18 in App.js
    const { movieId } = useParams();

    // Below: Destructoring the useMovieFetch hook to be used here
    //Calling the useFetchMovie hook for the specific movie id, movie/state is now equal to the param movieId
    const { state: movie, loading, error } = useMovieFetch(movieId);

    console.log(movie)

    if(loading) return <Spinner/>
    if(error) return <div>Something went wrong...</div>

    return (
        <>
        <BreadCrumb movieTitle={movie.original_title}/>
        <MovieInfo movie={movie} />
        <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
        <Grid header='Actors'>
            {movie.actors.map((actor) => (
                <Actor
                    key={actor.credit_id}
                    name={actor.name}
                    character={actor.character}
                    imageUrl={
                        actor.profile_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                        : NoImage
                    }
                    />
            ))}
        </Grid>
        </>
    )
}

export default Movie;