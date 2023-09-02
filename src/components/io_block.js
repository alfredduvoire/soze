import styled from 'styled-components'

const StyledIOBlock = styled.div`
position: relative;
color: #333333;
margin: ${props => props.idx === 0 ? "0 8px 0 0" : "0 0 0 8px"};
height: 80%;
aspect-ratio: 1 / 4;
box-sizing: border-box;

padding-bottom: 14px;
padding-top: 9px;

font-size: 1.5em;

display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: ${props => props.idx === 0 ? "start" : "end"};
// ${props => props.idx === 1 ? "flex-grow: 1" : ""};

`;

const StyledCounter = styled.div`
position: absolute;
bottom: -12%;
${props => props.idx === 0 ? "left: 10px" : "right: 10px"};


`;

const StyledConnector = styled.div`
    z-index: -1;
    background: #FFC000;
    // ${props => props.ioIdx === 1 ? "box-sizing: border-box" : ""};

    width: 100%;
    height: 1px;
    border: 4px solid #FFC000;
    border-radius: ${props => props.ioIdx === 0 ? "0 8px 8px 0" : "8px 0 0 8px"};
`;

const IO = (props) => {

    const connectorList = (num) => {
        return new Array(num).fill(undefined).map((x, i) => {
            return <StyledConnector key={i} ioIdx={props.idx}/>;
        });
    }

    return (
        <StyledIOBlock idx={props.idx}>
            {connectorList(props.num)}
            <StyledCounter idx={props.idx} >
                {props.num}
            </StyledCounter>
        </StyledIOBlock>
    );
}


export default IO;