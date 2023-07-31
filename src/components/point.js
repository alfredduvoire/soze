import styled, {keyframes} from 'styled-components';

const pointAnimation = keyframes`
    0% {
        transform: scale( .01 );
        opacity: 0;
    }
    90% {
        transform: scale( 1.2 );
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

const StyledPoint = styled.img`
    margin: 3px;
    width: 100%;

    opacity: 0;
    animation-name: ${pointAnimation};
    animation-duration: ${props => "" + props.newPointTime + "ms"};
    animation-fill-mode: forwards;
`;

const Point = (props) => {
    return (
        <StyledPoint 
            newPointTime={props.newPointTime} 
            alt=""
            src="https://raw.githubusercontent.com/dcstrandberg/soze/main/public/point.png"
        />
    );
}


export default Point;