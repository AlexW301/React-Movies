import React, { useState, useEffect } from "react";
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";
//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
//Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
    const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();

    console.log(state);

    if(error)  return <div>Something went wrong...</div>

    return (
        //Fragment as parent element instead of div
        //If there is a first result in state then render/return the HeroImage with the specified props (using the state) or return null if no first result in state
        <>
        {!searchTerm && state.results[0] ?
        <HeroImage 
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
            title={state.results[0].original_title}
            text={state.results[0].overview}
            /> 
        : null
        }
        <SearchBar setSearchTerm={setSearchTerm} />
        <Grid header={searchTerm ? 'Search Reuslts' : 'Popular Movies'}>
            {state.results.map(movie => (
                <Thumb 
                    key={movie.id}
                    clickable
                    image={
                        movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                    }
                    movieID={movie.id}
                />
            ))}
        </Grid>
        {loading && <Spinner/>}
        {state.page < state.total_pages && !loading && (
            <Button text='Load More' callback={() => setIsLoadingMore(true)} />
        )}
        </>
    )
}

export default Home;