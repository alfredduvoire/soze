import styled from 'styled-components';

import Footer from './footer.js';
import DetailBoard from './detail_board.js';
import InvalidWarning from './invalid_warning_container.js';
import DetectiveContainer from './detective_container.js';
import DetectiveName from './detective_name.js';

const StyledPlayArea = styled.div`
    height: 100%;
    width: 85%;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    padding: 1em;
    margin: 0;

    // border: 1px solid red;
`;

const PlayArea = (props) => {
    
    return (
        <StyledPlayArea >

            <DetailBoard
                detailList = {props['detailList']}
                handleBoardClick = {props.handleBoardClick}
            />

            <DetectiveContainer 
                showCompleteModal = {props.showCompleteModal} 
                duration={props.completeModalTime}
                dialogueText={props.dialogueText}
            />
            
            <InvalidWarning 
                showWarning = {
                    (( !(props['isConnecting']) && props['storyDetails'].length > 0 ) || 
                        (!(props['isValid']) && props['detailTypeCount']['who'] > 0 
                        && props['detailTypeCount']['where'] > 0 
                        && props['detailTypeCount']['when'] > 0))
                }
            />

            <Footer 
                storyDetails = {props.storyDetails}
                handleStoryClick = {props.handleStoryClick}
                IO = {props.IO}
                isComplete = {props.isComplete}
                nextIO = {props.nextIO}
                multiplier={props.multiplier}
                storyLengthRequirement={props.storyLengthRequirement}
                slotColorList={props.slotColorList}

            />

            <DetectiveName
                detectiveName={props.detectiveName}
                level={1}
            />
            
        </StyledPlayArea>
    );
}


export default PlayArea;