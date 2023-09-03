import styled, { keyframes } from 'styled-components';

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

const StyledDetailImg = styled.div`
    position: relative;
    height: ${props => props.parent === "story" ? "100%" : "90%"};
    aspect-ratio: 1 / 1;
    object-fit: contain;

    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: contain;

    margin: 0;
    grid-row: ${props => handleGridPlacement(props.idx).row};
    grid-column: ${props => handleGridPlacement(props.idx).column};

    animation-name:  ${props => props.selected ? select : null};
    animation-duration: 200ms;
    animation-fill-mode: forwards;

    &:after {
        content: '${props => props.counter}';
        position: absolute;
        bottom: 10%;
        left: 38%;

        height: 20%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        color: white;
        background-color: #FFAAAA;
        border: 3px solid #FFFFFF;
    };
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
                type={props.type}
                counter={props.counter}
            />
    );
}

export default Detail;    