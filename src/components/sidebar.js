import styled from 'styled-components';
import RefreshContainer from './refresh_container';
import ScoreContainer from './score_container';

const StyledSidebar = styled.div`
    height: 100%;
    width: 20%;

    display: flex;
    flex-direction: column;

    padding: 1em;
    margin: 0px;

    justify-content: space-between;
    align-items: center;

    border: 1px solid green;
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
            />
        </StyledSidebar>
    );
}


export default Sidebar;