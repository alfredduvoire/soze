import styled from 'styled-components';
import RefreshContainer from './refresh_container';
import ScoreContainer from './score_container';

const StyledSidebar = styled.div`
    height: 100%;
    width: 15%;

    display: flex;
    flex-direction: column;

    padding: 1em;
    margin: 0px;

    justify-content: space-around;
    align-items: center;

    // border: 1px solid green;
`;

const Sidebar = (props) => {
    
    return (
        <StyledSidebar >
            <RefreshContainer 
                numRefreshes={props.numRefreshes}
                handleRefreshClick={props.handleRefreshClick}        
                refreshEarned={props.refreshEarned}
                refreshEarnedTime={props.refreshEarnedTime}
            />
            
            <ScoreContainer 
                score={props.score}
                scoreNeeded={props.scoreNeeded}
                newPointTime={props.newPointTime}
                blankPointTime={props.blankPointTime}
                pointLossIdx = {props.pointLossIdx}
            />
        </StyledSidebar>
    );
}


export default Sidebar;