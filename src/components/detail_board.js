import Detail from "./detail.js"
import styled from 'styled-components'

const StyledBoardDiv = styled.div`
    background: #EEEEEE;
    width: 90%;
    height: 9em;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DetailBoard = (props) => {
    // create the list of details from the props
    let detailList = props.detailList.map( (x, i) => {
        return (
            <Detail
                type={x.type}
                connectors={x.connectors}
                idx={i}
            />
        );
    });

    return (
        <StyledBoardDiv>
            {detailList}
        </StyledBoardDiv>
    )
}


export default DetailBoard;