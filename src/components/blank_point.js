import styled, {keyframes} from 'styled-components';

const pointAnimation = keyframes`
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

const StyledBlankPoint = styled.img`
    margin: 3px;
    width: 100%;

    animation-name: ${props => props.showPointLoss ? pointAnimation : null};
    animation-duration: ${props => "" + props.blankPointTime + "ms"};
    animation-fill-mode: forwards;
`;

const BlankPoint = (props) => {
    return (
        <StyledBlankPoint 
            alt=""
            src="https://raw.githubusercontent.com/dcstrandberg/soze/main/public/point-blank.png"
            blankPointTime = {props.blankPointTime}
            showPointLoss = {props.showPointLoss}
        />
    );
}


export default BlankPoint;