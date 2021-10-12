import {useState, useEffect, useRef} from "react";
//API
import API from '../API'
// Helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

// Always name custom hooks with 'use' before the name
export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    console.log(searchTerm)

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            //Fetched the movie data from the database
            const movies = await API.fetchMovies(searchTerm, page);

            //Adds the movie data fetched from the database to the state
            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    //Initial Render and Search
    useEffect(() => {
        if(!searchTerm) {
            const sessionState = isPersistedState('homeState');

            if(sessionState) {
                console.log('Grabbing from sessionStorage')
                setState(sessionState);
                return;
            }
        }
        console.log('Grabbing From API')
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    //Load more

    useEffect(() => {
        // Below: Do nothing if loading more is false
        if(!isLoadingMore) return

        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    },[isLoadingMore, searchTerm, state.page])

    // Write to sessionStorage
    useEffect(() => {
        if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
    }, [searchTerm, state])

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}