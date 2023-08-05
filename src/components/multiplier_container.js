import styled, {keyframes} from 'styled-components';

const StyledMultiplierContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    
    aspect-ratio: 1 / 1;
    height: 100%;
    box-sizing: border-box;

    padding: 5px;

    border: 3px solid #333333;
    border-radius: 5px;
    box-shadow: 3px 3px 0px #FFC000, inset 3px 3px 0px #FFC000;
`;

const multChangeAnim = keyframes`
    0% {
        opacity: 0;
        transform: scale(.01);
    }
    80% {
        opacity: 1;
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const MultiplierText = styled.div`
    width: 100%;
    height: 50%;
    
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;

    font-size: 3em;
    font-weight: bold;
    color: #FFC000;
    text-align: center;

    opacity: 0;
    animation-name: ${multChangeAnim};
    animation-duration: 250ms;
    animation-fill-mode: forwards;
`;

const MultiplierTitle = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1em;
    text-align: center;
`;

const MultiplierContainer = (props) => {
    
    return (
        <StyledMultiplierContainer 
        
        >
            <MultiplierTitle>
                Combo <br /> Multiplier
            </MultiplierTitle>

            <MultiplierText multiplier={props.multiplier}>
                {"" + props.multiplier + "x"}
            </MultiplierText>
        </StyledMultiplierContainer>
    );
}


export default MultiplierContainer;