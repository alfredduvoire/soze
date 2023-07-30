import styled from 'styled-components';

import Point from './point';
import BlankPoint from './blank_point';

const StyledScoreTracker = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column-reverse;
    justify-content: end;
    align-items: center;

    margin: 5px;
    padding: 5px;

    border: 2px solid #DDDD88;
    border-radius: 5px;

    // box-shadow: 3px 3px 0px rgba(220, 220, 150, 1);

    background: rgb(255,246,146);
    background: linear-gradient(0deg, rgba(255,246,146,1) 0%, rgba(255,246,146,1) 67%, rgba(255,246,146,0) 100%);
`;

const ScoreTracker = (props) => {

    const pointList = new Array(props.scoreNeeded).fill(undefined).map((x, i) => {
        return (i < props.score) ? (<Point 
            key={i}
            newPointTime = {props.newPointTime}
        />) : (<BlankPoint 
            key={i}
            blankPointTime={props.blankPointTime}
            showPointLoss={((i + 1) === props.pointLossIdx)}
        />);
    });

    return (
        <StyledScoreTracker>
            {pointList}
        </StyledScoreTracker>

    );
}


export default ScoreTracker;