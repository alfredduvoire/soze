import Detail from "./detail.js"
import DetailGap from "./detail_gap.js";
import IO from "./io_block.js";

import styled from 'styled-components'

const StyledStoryDiv = styled.div`
    background: #FFFFDD;
    width: 90%;
    height: 9em;

    padding: 0em 1em;

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
                parent="story"
            />
        );
    });

    // Append to the beginning and end

    return (
        <StyledStoryDiv>
            <IO num={props.IO[0]} />
            {detailList}
            <DetailGap />
            <IO num={props.IO[1]} />
        </StyledStoryDiv>
    );
}


export default Story;