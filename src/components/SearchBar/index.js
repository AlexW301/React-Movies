import React, { Component } from "react";
import PropTypes from "prop-types";
//Image
import searchIcon from '../../images/search-icon.svg';
//Styles
import { Wrapper, Content } from './SearchBar.styles';

class SearchBar extends Component {
    state = { value: ''};
    timeout = null;

    // Componentdidmount Componentdidupdate Componentwillunmount
    componentDidUpdate(_prevProps, prevState) {
        if(this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props;

            clearTimeout(this.timeout)

            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value)
            }, 500)
        }
    }

    render() {

        const { value } = this.state;

        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt='search-icon' />
                    <input 
                    type='text'
                    placeholder='Search Movie'
                    onChange={event => this.setState({value: event.currentTarget.value})}
                    value={value}
                    />
                </Content>
            </Wrapper>
        )
    }

};

SearchBar.propTypes = {
    callback: PropTypes.func
}

export default SearchBar;

/*
//////// FUNCTIONAL COMPONENT /////////////
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
//Image
import searchIcon from '../../images/search-icon.svg';
//Styles
import { Wrapper, Content } from './SearchBar.styles';

const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('');
    // Below: Initial state when loading the page
    const initial = useRef(true);

    useEffect(() => {
        // Below: This skips the initial render so this does not run on the first page load
        if(initial.current) {
            initial.current = false;
            return;
        }

        const timer = setTimeout(() => {
            setSearchTerm(state)
        }, 500)

        // Below: Doesnt trigger until the function has finished and is going to run again. This resets the timer so we don't have multiple timers running
        return () => clearTimeout(timer)
    }, [setSearchTerm, state])

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt='search-icon' />
                <input 
                type='text'
                placeholder='Search Movie'
                onChange={event => setState(event.currentTarget.value)}
                value={state}
                />
            </Content>
        </Wrapper>
    )
};

SearchBar.propTypes = {
    callback: PropTypes.func
}

export default SearchBar;
*/