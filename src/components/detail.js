// import React from 'react';
// import Header from './header.js';
import styled, { keyframes } from 'styled-components';
// import {headShake} from 'react-animations';

// const headShakeAnimation = keyframes`${headShake}`;

const select = keyframes`
    0% {
        transform: scale( 1 ) translate(0, 0);
    }
    90% {
        transform: scale( .01 ) translate(0, 500% );
    }
    100% {
        transform: scale( 1 ) translate(0, 0);
    }
`;

const StyledDetailImg = styled.img`
    margin: ${props => (props.parent === "story") ? "0.5em 0em" : "0.5em"};
    height: 7em;
    width: 7em;
    object-fit: contain;

    filter: contrast( ${props => props.selected ? 0.1 : 1} );
    transition: filter 401ms;

    animation-name:  ${props => props.selected ? select : null};
    animation-duration: 200ms;

    // border: 1px solid black;
    // border-radius: 3px;
`;


const Detail = (props) => {
    // props of the form:
    // Props we need:
    // Connector List
    // Class: (e.g., Where, When, Who)
    // Do we need position in list? I'm thinking we probably need the index
    // I don't think we need a status or anything, but... who knows

    return (
            <StyledDetailImg 
                src={"https://raw.githubusercontent.com/dcstrandberg/soze/main/public/" + props.type + "-" + props.connectors[0] + "-" + props.connectors[1] + ".png"}  
                alt=""
                selected={props.selected}
                parent={props.parent}
                onClick={() => props.handleClick(props.idx)}
            />
    );
}

export default Detail;    