import React, { useContext } from "react";
import { Link } from "react-router-dom";

import RMDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

//Context
import { Context } from '../../context';

const Header = () => {
    const [user] = useContext(Context);
    console.log(user);

    return (
    <Wrapper>
        <Content>
            <Link to='/'>
            <LogoImg src={RMDBLogo} alt='rmdb-logo' />
            </Link>
            <div className="login-section">
            {
                user ? (
                    <span className="loggedin">{user.username}</span>
                ) : (
                    <Link to="/login">
                        <span className="login">Login</span>
                    </Link>
                )
            }
            <TMDBLogoImg src={TMDBLogo} alt='tmdb-logo' />
            </div>
        </Content>
    </Wrapper>
    );
};

export default Header;