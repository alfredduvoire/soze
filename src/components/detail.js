// import React from 'react';
// import Header from './header.js';
import styled from 'styled-components'

const StyledDetailImg = styled.img`
    background: papayawhip;
    margin: 0.5em;
    height: 3em;
    width: auto;
    object-fit: contain;

    border: 1px solid black;
    border-radius: 3px;
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
                src={"https://raw.githubusercontent.com/dcstrandberg/soze/e49110aca181cf3d4bb213400e94d43d0439d97a/public/" + props.type + "-" + props.connectors[0] + "-" + props.connectors[1] + ".png"}  
                alt=""
            />
    );
}

export default Detail;    