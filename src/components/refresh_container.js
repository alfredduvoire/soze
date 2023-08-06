import styled from 'styled-components';
import RefreshButton from './refresh_button';
import RefreshEarned from './refresh_earned';

const StyledRefreshContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    justify-content: space-between;
    align-items: center;

    text-align: center;
    // font-size: 1.5em;
    color: #333333;
`;

const StyledCostDiv = styled.div`
    opacity: ${props => (props.numRefreshes === 0) ? 1 : 0};
`;

const RefreshContainer = (props) => {
    
    return (
        <StyledRefreshContainer>
            <b>REFRESH</b>
            <RefreshButton 
                numRefreshes={props.numRefreshes}
                handleRefreshClick={props.handleRefreshClick}  
                refreshEarned={props.refreshEarned}
                refreshEarnedTime={props.refreshEarnedTime}
            />
                <StyledCostDiv
                    numRefreshes = {props.numRefreshes}
                >- Costs 1 Star -</StyledCostDiv>
                <RefreshEarned 
                    refreshEarned={props.refreshEarned}
                    refreshEarnedTime={props.refreshEarnedTime}
                />
        </StyledRefreshContainer>

    );
}


export default RefreshContainer;