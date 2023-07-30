import styled from 'styled-components';
import ScoreTracker from './score_tracker';

const StyledScoreContainer = styled.div`
    height: 50%;

    display: flex;
    flex-direction: column;
    
    justify-content: space-between;
    align-items: center;
`;

const ScoreContainer = (props) => {
    
    return (
        <StyledScoreContainer>
            <div><b>Credibility</b></div>
            <ScoreTracker 
                score={props.score}
                scoreNeeded={props.scoreNeeded}
            />
        </StyledScoreContainer>

    );
}


export default ScoreContainer;