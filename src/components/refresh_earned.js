import styled, {keyframes} from 'styled-components';
        
const refreshEarnedAnimation = keyframes`
    0% {
        transform: scale( 1 );
        opacity: 0;
    }
    20% {
        transform: scale( 2 );
        opacity: 1;
    }
    80% {
        transform: scale( 2 );
        opacity: 1;
    }
    100% {
        transform: scale( 1 );
        opacity: 0;
    }
`;

const StyledRefreshEarned = styled.div`
    width: 100%;
    margin-top: -1em;

    text-align: center;

    font-weight: bold;
    color: green;

    opacity: 0;

    animation-name:  ${props => props.refreshEarned ? refreshEarnedAnimation : null};
    animation-duration: ${props => "" + props.refreshEarnedTime + "ms"};
`;


const RefreshEarned = (props) => {
    
    return (
        <StyledRefreshEarned
            refreshEarned={props.refreshEarned}
            refreshEarnedTime={props.refreshEarnedTime}
        >
            +1
        </StyledRefreshEarned>

    );
}


export default RefreshEarned;