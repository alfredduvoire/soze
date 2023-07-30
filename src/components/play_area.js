import styled from 'styled-components';

import StoryCompleteModal from './story_complete_modal.js';
import Footer from './footer.js';
import DetailBoard from './detail_board.js';

const StyledPlayArea = styled.div`
    height: 100%;
    width: 85%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    padding: 1em;
    margin: 0;

    border: 1px solid red;
`;

const PlayArea = (props) => {
    
    return (
        <StyledPlayArea >
            
            {(props.showCompleteModal) && 
                <StoryCompleteModal duration={props.completeModalTime}/>
            }

            <DetailBoard
                detailList = {props['detailList']}
                handleBoardClick = {props.handleBoardClick}
            />

            <Footer 
                storyDetails = {props.storyDetails}
                handleStoryClick = {props.handleStoryClick}
                IO = {props.IO}
            />

            { 
                // TODO: This needs to be turned into a component at some point 
                (( !(props['isConnecting']) && props['storyDetails'].length > 0 ) || 
                (!(props['isValid']) && props['detailTypeCount']['who'] > 0 
                    && props['detailTypeCount']['where'] > 0 
                    && props['detailTypeCount']['when'] > 0)) && 
                    <font color="red">
                    <p />This story doesn't add up!
                    </font>
            }
            
        </StyledPlayArea>
    );
}


export default PlayArea;