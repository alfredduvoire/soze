import Detail from "./detail.js";
import styled from 'styled-components';

const StyledBoardDiv = styled.div`
    background: #FAFAFA;
    width: 100%;
    padding: 1em;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

const DetailBoard = (props) => {
    // create the list of details from the props
    let detailList = props.detailList.map( (x, i) => {
        return (
            <Detail
                key={i}
                type={x.type}
                connectors={x.connectors}
                selected={x.selected}
                idx={i}
                handleClick={props.handleBoardClick}
                parent={"board"}
            />
        );
    });

    return (
        <StyledBoardDiv>
            {detailList}
        </StyledBoardDiv>
    );
}


export default DetailBoard;