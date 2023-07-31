import styled from 'styled-components';
import ScoreTracker from './score_tracker';

const StyledScoreContainer = styled.div`
    height: 60%;
    width: 40%;

    display: flex;
    flex-direction: column;
    
    justify-content: space-between;
    align-items: center;

    font-size: 1.5em;
    color: #444422;
`;

const ScoreContainer = (props) => {
    
    return (
        <StyledScoreContainer>
            <div><b>Credibility</b></div>
            <ScoreTracker 
                score={props.score}
                scoreNeeded={props.scoreNeeded}
                newPointTime={props.newPointTime}
                blankPointTime={props.blankPointTime}
                pointLossIdx = {props.pointLossIdx}
            />
        </StyledScoreContainer>

    );
}


export default ScoreContainer;