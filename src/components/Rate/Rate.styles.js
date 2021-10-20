import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;

    .set-rating {
        display: flex;
        align-items: center;
        justify-content: left;
        gap: 1rem;

        font-size: 1.5rem;
        font-weight: 900;
    }

    input[type=range] {
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        width: 10rem; /* Specific width is required for Firefox. */
        background: transparent; /* Otherwise white in Chrome */
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }

    input[type=range]:focus {
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    }

    input[type=range]::-webkit-slider-thumb {
        background: #fff;
        border: 1px solid #000;
        height: 30px;
        cursor: pointer;
        color: #fff;
    }

    input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;

         /* Hides the slider so custom styles can be added */
        background: transparent; 
        border-color: transparent;
         color: transparent;
        }

    input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: var(--white);
            cursor: pointer;
            margin-top: -7px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
        }

    input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 8.4px;
            cursor: pointer;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            background: var(--white);
            border-radius: 10.3px;
            border: 0.2px solid #010101;
        }

    input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--white);
        }

    button {
        display: block;
        background: var(--medGrey);
        width: 25%;
        min-width: 150px;
        height: 40px;
        border-radius: 30px;
        color: var(--white);
        border: 0;
        font-size: var(--fontBig);
        transition: all 0.3s;
        outline: none;
        cursor: pointer;

    :hover {
        opacity: 0.8;
    }
    }
`;
