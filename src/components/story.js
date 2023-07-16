import Detail from "./detail.js"
import styled from 'styled-components'

const StyledStoryDiv = styled.div`
    background: #FFFFDD;
    width: 90%;
    height: 9em;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;

`;

const Story = (props) => {
    // create the list of details from the props
    let detailList = props.storyDetails.map( (x, i) => {
        return (
            <Detail
                key={i}
                type={x.type}
                connectors={x.connectors}
                idx={i}
                boardIdx={x.boardIdx}
                handleClick={props.handleStoryClick}
            />
        );
    });

    return (
        <StyledStoryDiv>
            {detailList}
        </StyledStoryDiv>
    )
}


export default Story;