import styled from 'styled-components';
import IO from './io_block';

const StyledPreviewContainer = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    aspect-ratio: 1 / 1;
    height: 100%;
    box-sizing: border-box;



    border: 3px solid #333333;
    border-radius: 5px;
    box-shadow: 3px 3px 0px #FFC000, inset 3px 3px 0px #FFC000;
`;

const PreviewText = styled.div`
    height: 0;
    width: 100%;
    overflow: visible;

    font-size: 1em;
    text-align: center;

    position: absolute;
    top: 5px;
`;

const PreviewContainer = (props) => {
    
    return (
        <StyledPreviewContainer >
            <PreviewText >
                Next Question
            </PreviewText>
            <IO num={props.nextIO[0]} idx={0} />
            {/* Note, I'm passing idx 2 to the second one so that it doesn't flex-grow, but it still right aligns */}
            <IO num={props.nextIO[1]} idx={2} />
        </StyledPreviewContainer>
    );
}


export default PreviewContainer;