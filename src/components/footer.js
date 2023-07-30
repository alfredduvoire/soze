import styled from 'styled-components';
import Story from './story.js';


const StyledFooter = styled.div`
    width: 90%;
    height: 9em;

    padding: 0em 1em;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;
`;

const Footer = (props) => {
    
    return (
        <StyledFooter >

            <div>Multiplier</div>

            <div>Input</div>

            <Story 
                storyDetails = {props['storyDetails']}
                handleStoryClick = {props.handleStoryClick}
                IO = {props['IO']}
            />

            <div>Output</div>

            <div>Preview</div>

        </StyledFooter>
    );
}


export default Footer;