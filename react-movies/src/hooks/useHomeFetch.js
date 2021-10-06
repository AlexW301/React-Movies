import {useState, useEffect, useRef} from "react";
//API
import API from '../API'

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

// Always name custom hooks with 'use' before the name
export const useHomeFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(false);

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

    //Initial Render //The empty dependency array means it will run only once
    useEffect(() => {
        fetchMovies(1);
    }, []);

    return { state, loading, error };
}