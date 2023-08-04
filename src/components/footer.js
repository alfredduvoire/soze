import styled from 'styled-components';

import MultiplierContainer from './multiplier_container.js';
import PreviewContainer from './preview_container.js';
import StoryContainer from './story_container.js';

const StyledFooter = styled.div`
    width: 100%;
    height: 20%;
    box-sizing: border-box;

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

            <MultiplierContainer />

            <StoryContainer 
                storyDetails = {props['storyDetails']}
                handleStoryClick = {props.handleStoryClick}
                IO = {props['IO']}
                isComplete = {props.isComplete}
            />

            <PreviewContainer />

        </StyledFooter>
    );
}


export default Footer;