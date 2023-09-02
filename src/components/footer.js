import styled from 'styled-components';

import MultiplierContainer from './multiplier_container.js';
import PreviewContainer from './preview_container.js';
import StoryContainer from './story_container.js';

const StyledFooter = styled.div`
    // width: 100%;
    width: auto;
    height: 20%;
    box-sizing: border-box;
    padding: 0 5px 5px 5px;

    z-index: 10;

    margin-bottom: 1em;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;
    overflow-x: hidden;
    overflow-y: visible;

    // border: 2px solid black;
`;

const Footer = (props) => {
    
    return (
        <StyledFooter >

            <MultiplierContainer
            multiplier={props.multiplier}
            />

            <StoryContainer 
                storyDetails = {props['storyDetails']}
                handleStoryClick = {props.handleStoryClick}
                IO = {props['IO']}
                isComplete = {props.isComplete}
                storyLengthRequirement={props.storyLengthRequirement}
                slotColorList={props.slotColorList}
            />

            <PreviewContainer
                nextIO = {props.nextIO}
            />

        </StyledFooter>
    );
}


export default Footer;