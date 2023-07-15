import Detail from "./detail.js"
import styled from 'styled-components'

const StyledStoryDiv = styled.div`
    background: #FFFFDD;
    width: 90%;
    height: auto;

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
                type={x.type}
                connectors={x.connectors}
                idx={i}
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