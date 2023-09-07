import styled from 'styled-components';
import DetectiveImage from './detective_image';
import StoryCompleteModal from './story_complete_modal';

const StyledDetectiveContainer = styled.div`
    position: relative;
    width: 100%;
    height: 0em;
    overflow-y: visible; 

    display: flex;
    justify-content: center;
    align-items: center;

    // margin: 1em 0em;

    font-size: 1.5em;
    font-weight: bold;

    // border: 2px solid blue;
`;


const DetectiveContainer = (props) => {
    
    return (
        <StyledDetectiveContainer>
            <StoryCompleteModal 
                showCompleteModal={props.showCompleteModal} 
                duration={props.duration}
                dialogueText={props.dialogueText}
            />
            <DetectiveImage src="https://raw.githubusercontent.com/dcstrandberg/soze/main/public/detective-1.png" />
        </StyledDetectiveContainer>
    );
}


export default DetectiveContainer;