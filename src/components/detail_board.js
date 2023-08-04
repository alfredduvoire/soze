import Detail from "./detail.js";
import styled from 'styled-components';

const StyledBoardDiv = styled.div`
    // background: #FAFAFA;
    width: 100%;
    height: 60%;
    // padding: 1em;
    box-sizing: border-box;

    margin: 1em 0;

    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    // align-items: center;
    // flex-wrap: wrap;

    display: grid;
    grid-template-columns: repeat(6, minmax(100px, 1fr));
    grid-template-rows: repeat(3, minmax(100px, 1fr));
    align-items: center;
    justify-items: center;
    // column-gap: 10px;
    // row-gap: 10px;
    // min-height: 0;
    // min-width: 0;
    // max-height: 100%;
    // max-width: 100%;

    border: 3px solid #333333;
    border-radius: 5px;
    box-shadow: 3px 3px 0px #FFC000, inset 3px 3px 0px #FFC000;

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