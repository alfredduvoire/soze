import styled from 'styled-components';
import RefreshButton from './refresh_button';
import RefreshEarned from './refresh_earned';

const StyledRefreshContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    justify-content: space-between;
    align-items: center;
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
            {(props.numRefreshes === 0) &&
                <div>- Costs 1 Star -</div>
            }
        </StyledRefreshContainer>

    );
}


export default RefreshContainer;