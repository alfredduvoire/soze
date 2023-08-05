import Detail from "./detail.js"
import DetailGap from "./detail_gap.js";

import { useRef, useEffect } from "react";

import styled from 'styled-components'

const StyledStoryDiv = styled.div`
    // background: #FFFFDD;
    box-sizing: border-box;

    width: auto;
    height: 100%;

    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: visible;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar { display: none; }

    `;

const Story = (props) => {
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollLeft += 9999;
      }, [props.storyDetails.length]);

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
        <StyledStoryDiv ref={divRef}>
            {detailList}
            {!(props.isComplete) && <DetailGap />}
        </StyledStoryDiv>
    );
}


export default Story;