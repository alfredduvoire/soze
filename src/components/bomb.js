import styled, { keyframes } from 'styled-components';

const shake = keyframes`
    0% {
        transform: translate(0, 0);
    }
    17% {
        transform: translate(10%, 0);
    }
    33% {
        transform: translate(-10%, 0);
    }
    50% {
        transform: translate(10%, 0);
    }
    67% {
        transform: translate(-10%, 0);
    }
    83% {
        transform: translate(10%, 0);
    }
    100% {
        transform: translate(0, 0);
    }
`;

const StyledBomb = styled.div`
position: absolute;
top: -10%;
// left: 38%;
box-sizing: border-box;

height: 25%;
aspect-ratio: 1 / 1;
border-radius: 50%;

display: flex;
justify-content: center;
align-items: center;
padding-bottom: 2%;

color: ${props => props.borderColor};
font-weight: bold;
font-size: 1.2em;

background-color: ${props => props.bgColor};
border: 3px solid ${props => props.borderColor};

animation-name: ${shake};
animation-duration: 500ms;
animation-fill-mode: forwards;
`;


const Bomb = (props) => {
    
    

    return (
            <StyledBomb
                bgColor={props.bgColor}
                borderColor={props.borderColor}
                key={props.counter}
            >
                {props.counter}
            </StyledBomb>
    );
}

export default Bomb;    