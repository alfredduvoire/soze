import styled, {keyframes} from 'styled-components';

const refreshEarnedAnimation = keyframes`
    0% {
        transform: rotate( 0 );
    }
    100% {
        transform: rotate( 360deg );
    }
    `;
    
const onClickAnim = keyframes`
    0% {
        transform: scale( 1 );
    }
    50% {
        transfom: scale(0.9);
    }
    100% {
        transform: scale(1);
    }
    
`;

const StyledRefreshButton = styled.div`
    width: 65%;
    aspect-ratio: 1;
    background-image: url("https://raw.githubusercontent.com/dcstrandberg/soze/main/public/refresh-image.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;
    font-size: 1.2em;
    color: #333333;
    text-align: center;

    animation-name: ${props => props.refreshEarned > 0 ? refreshEarnedAnimation : null};
    animation-duration: ${props => "" + props.refreshEarnedTime + "ms"};

    // padding: 10px;

    // border: 2px solid green;
    // border-radius: 5px;

    &:active{
        transform: scale(0.95);
        // transition: transform 100ms; 
    }
`;

const RefreshButton = (props) => {
    
    return (
        <StyledRefreshButton
            onClick={props.handleRefreshClick}
            refreshEarned={props.refreshEarned}
            refreshEarnedTime={props.refreshEarnedTime}
        >
            {props.numRefreshes}
        </StyledRefreshButton>

    );
}


export default RefreshButton;