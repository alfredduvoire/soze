import Detail from "./detail.js"
import styled from 'styled-components'

const StyledBoardDiv = styled.div`
    background: #FAFAFA;
    width: 90%;
    height: 18em;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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