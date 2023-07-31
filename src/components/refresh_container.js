import styled from 'styled-components';
import RefreshButton from './refresh_button';
import RefreshEarned from './refresh_earned';

const StyledRefreshContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    justify-content: space-between;
    align-items: center;
`;

const StyledCostDiv = styled.div`
    opacity: ${props => (props.numRefreshes === 0) ? 1 : 0};
`;

const RefreshContainer = (props) => {
    
    return (
        <StyledRefreshContainer>
            <RefreshButton 
                numRefreshes={props.numRefreshes}
                handleRefreshClick={props.handleRefreshClick}        
            />
                <RefreshEarned 
                    refreshEarned={props.refreshEarned}
                    refreshEarnedTime={props.refreshEarnedTime}
                />
                <StyledCostDiv
                    numRefreshes = {props.numRefreshes}
                >- Costs 1 Star -</StyledCostDiv>
        </StyledRefreshContainer>

    );
}


export default RefreshContainer;