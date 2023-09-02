import Detail from "./detail.js"
// import DetailGap from "./detail_gap.js";
import StorySlot from "./story_slot.js";

// import { useRef, useEffect } from "react";

import styled from 'styled-components'

const StyledStoryDiv = styled.div`
    // background: #EEEEEE;
    box-sizing: border-box;

    // width: auto;
    width: 100%;
    height: 100%;

    display: flex;
    // justify-content: start;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: visible;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar { display: none; }

    `;

const Story = (props) => {
    // const divRef = useRef(null);

    // useEffect(() => {
    //     divRef.current.scrollLeft += 9999;
    //   }, [props.storyDetails.length]);

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

    // create the slots and include details in the needed ones
    let slotList = props.slotColorList.map((x, i) => {
        return (
            <StorySlot
                detail={(i < detailList.length) ? detailList[i] : undefined}
                slotColor={x}
            />
        );
    });

    // Append to the beginning and end

    return (
        <StyledStoryDiv>
        {slotList}
        </StyledStoryDiv>
    );
}


export default Story;