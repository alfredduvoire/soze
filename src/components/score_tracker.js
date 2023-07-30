import styled from 'styled-components';
import Point from './point';

const StyledScoreTracker = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column-reverse;
    justify-content: end;
    align-items: center;

    margin: 5px;

    border: 3px solid #AAAA00;
    border-radius: 5px;

    background: rgb(255,246,146);
    background: linear-gradient(0deg, rgba(255,246,146,1) 0%, rgba(255,246,146,1) 67%, rgba(255,246,146,0) 100%);
`;

const ScoreTracker = (props) => {
    
    const pointList = new Array(props.score).fill(undefined).map(() => {
        return <Point />
    })

    return (
        <StyledScoreTracker>
            {pointList}
        </StyledScoreTracker>

    );
}


export default ScoreTracker;