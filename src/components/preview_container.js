import styled from 'styled-components';

const StyledPreviewContainer = styled.div`
    // width: 10%;
    aspect-ratio: 1 / 1;
    height: 100%;
    box-sizing: border-box;

    border: 3px solid #333333;
    border-radius: 5px;
    box-shadow: 3px 3px 0px #FFC000, inset 3px 3px 0px #FFC000;
`;

const PreviewContainer = (props) => {
    
    return (
        <StyledPreviewContainer 
        
        >

        </StyledPreviewContainer>
    );
}


export default PreviewContainer;