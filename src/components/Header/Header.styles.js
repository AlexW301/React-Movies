import styled from "styled-components";

export const Wrapper = styled.div`
    background: var(--darkGrey);
    padding: 0 20px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--maxWidth);
    padding: 20px 0;
    margin: 0 auto;
    color: var(--white);

    a {
        color: var(--white);
        text-decoration: none;
    }

    .login-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }

    .login {
        font-size: 1.1rem;
    }

    .loggedin {
        font-size: 1.1rem;
    }
`;

export const LogoImg = styled.img`
    width: 200px;

    @media screen and (max-width: 500px) {
        width: 150px;
    }
`;

export const TMDBLogoImg = styled.img`
    width: 100px;

    @media screen and (max-width: 500px) {
        width: 80px;
    }
`;