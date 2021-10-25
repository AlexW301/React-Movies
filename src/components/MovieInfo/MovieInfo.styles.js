import styled from "styled-components";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

export const Wrapper = styled.div`
    background: ${({ backdrop }) => 
        backdrop ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop})` : '#000'};
        background-size: cover;
        background-position: center;
        padding: 40px 20px;
        animation: animateMovieInfo 1s;

        @keyframes animateMovieInfo {
            from {
                opacity: 0;
            } to {
                opacity: 1;
            }
        }
`;

export const Content = styled.div`
    display: flex;
    max-width: var(--maxWidth);
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;

    @media screen and (max-width: 768px) {
        display: block;
        max-height: none;
    }
`;

export const Text = styled.div`
    width: 100%;
    padding: 20px 40px;
    color: var(--white);
    overflow: hidden;

    .rating-directors {
        display: flex;
        justify-content: flex-start;
        gap: 60px;
    }

    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        background: #fff;
        color: #000;
        font-weight: 800;
        border-radius: 50%;
        margin: 0;
    }

    .rate-movie {
        text-transform: uppercase;
        font-weight: 900;
        margin-bottom: .7rem;
    }

    .directors {
        margin: 0 0 0 40px;

        p {
            margin: 0;
        }
    }

    h1 {
        @media screen and (max-width: 768px) {
            font-size: var(--fontBig);
        }
    }

    .wtw-main-heading {
        font-size: 1.5rem;
        border-bottom: 1px solid #fff;
        padding-bottom: 10px;
        margin: 10px 0;
    }

    .wtw-heading {
        font-size: 1.2rem;
        margin: 10px 0;
    }

    .where-to-buy {
        display: flex;
        gap: 10px;
    }

    .service-logo {
        width: 35px;
        height: 35px;
        border-radius: 10px;
    }

    .where-to-rent {
        display: flex;
        gap: 10px;
    }

    .not-available {
        margin: 0;
        letter-spacing: 2px;
    }

    .where-to-stream {
        display: flex;
        gap: 10px;
    }

`;