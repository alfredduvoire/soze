import Detail from "./detail.js"
import DetailGap from "./detail_gap.js";

import styled from 'styled-components'

const StyledStoryDiv = styled.div`
    background: #FFFFDD;

    width: 100%;

    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar { display: none; }

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
            {detailList}
            <DetailGap />
        </StyledStoryDiv>
    );
}


export default Story;