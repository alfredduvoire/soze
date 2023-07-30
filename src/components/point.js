import styled from 'styled-components';

const StyledPoint = styled.div`
    margin: 3px;
    width: 100%;

    aspect-ratio: 16 / 9;

`;

const Point = (props) => {
    return (
        <StyledPoint>
            +1
        </StyledPoint>

    );
}


export default Point;