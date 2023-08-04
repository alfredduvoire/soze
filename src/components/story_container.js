import styled from 'styled-components';
import Story from './story.js';
import IO from './io_block.js';

const StyledStoryContainer = styled.div`
    width: 80%;
    height: 100%;
    box-sizing: border-box;

    margin-left: 25px;
    margin-right: 25px;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    border: 3px solid #333333;
    border-radius: 5px;
    box-shadow: 3px 3px 0px #FFC000, inset 3px 3px 0px #FFC000;
`;

const StoryContainer = (props) => {
    
    return (
        <StyledStoryContainer>
            
            <IO num={props.IO[0]} idx={0} />
            <Story 
                storyDetails = {props['storyDetails']}
                handleStoryClick = {props.handleStoryClick}
                isComplete = {props.isComplete}
            />
            <IO num={props.IO[1]} idx={1} />

        </StyledStoryContainer>
    );
}


export default StoryContainer;