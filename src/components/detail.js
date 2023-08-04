// import React from 'react';
// import Header from './header.js';
import styled, { keyframes } from 'styled-components';
// import {headShake} from 'react-animations';

// const headShakeAnimation = keyframes`${headShake}`;

const select = keyframes`
    0% {
        transform: scale( 1 ) translate(0, 0);
        opacity: 1;
    }
    100% {
        transform: scale( .01 ) translate(0, 500% );
        opacity: 0;
    }
`;

const handleGridPlacement = (idx) => {
    if (idx < 6) {
        return {row: 1, column: idx + 1};
    } else if (idx < 9) {
        return {row: 2, column: idx - 5};
    } else if (idx < 10) {
        return {row: 2, column: idx - 3};
    } else if (idx < 13) {
        return {row: 3, column: idx - 9};
    } else if (idx < 14) {
        return {row: 3, column: idx - 7};
    } else {
        return;
    }
};

const StyledDetailImg = styled.img`
    // margin: ${props => (props.parent === "story") ? "0.5em 0em" : "0.5em"};
    margin: 0;
    // width: 80%;
    aspect-ratio: 1 / 1;
    height: 80%;
    object-fit: contain;
   
    grid-row: ${props => handleGridPlacement(props.idx).row};
    grid-column: ${props => handleGridPlacement(props.idx).column};

    animation-name:  ${props => props.selected ? select : null};
    animation-duration: 200ms;
    animation-fill-mode: forwards;
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
                idx={props.idx}
            />
    );
}

export default Detail;    