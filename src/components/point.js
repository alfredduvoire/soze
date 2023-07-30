import styled from 'styled-components';

const StyledPoint = styled.img`
    margin: 3px;
    width: 100%;

    aspect-ratio: 16 / 9;

`;

const Point = (props) => {
    return (
        <StyledPoint
            src = "/workspaces/soze/public/point.png"
        />
        
    );
}


export default Point;