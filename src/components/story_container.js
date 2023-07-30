import styled from 'styled-components';
import Story from './story.js';
import IO from './io_block.js';

const StyledStoryContainer = styled.div`
    width: 80%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    border: 2px solid red;
`;

const StoryContainer = (props) => {
    
    return (
        <StyledStoryContainer>
            
            <IO num={props.IO[0]} />
            <Story 
                storyDetails = {props['storyDetails']}
                handleStoryClick = {props.handleStoryClick}
            />
            <IO num={props.IO[1]} />

        </StyledStoryContainer>
    );
}


export default StoryContainer;