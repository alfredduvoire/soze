import styled from 'styled-components';

const StyledDetectiveImage = styled.img`
    position: absolute;
    right: 18%;
    bottom: 0;

    aspect-ratio: 1 / 1;
    width: 30%;
    // max-width: 350px;
    object-fit: contain;

    // border: 1px solid black;

    z-index: 1;
    transform: translate(0, 12%);

`;

const DetectiveImage = (props) => {
    
    return (
            <StyledDetectiveImage src="https://raw.githubusercontent.com/dcstrandberg/soze/main/public/detective-1.png" />
    );
}


export default DetectiveImage;