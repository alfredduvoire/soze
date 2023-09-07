import styled, { keyframes } from 'styled-components';
import Bomb from './bomb';

const select = keyframes`
    0% {
        transform: scale( 1 ) translate(0, 0);
        opacity: 1;
    }
    100% {
        transform: scale( .01 ) translate(0, 500% );
        opacity: 0;
    }
`;

const flyIn = keyframes`
    0% {
        transform: scale(0.01);
        opacity: 0;
    }
    83% {
        transform: scale(1.1);
        opacity: 1;
    }
    100% {
        transform: scale(1);
    }
`;

const handleGridPlacement = (idx) => {
    if (idx < 6) {
        return {row: 1, column: idx + 1};
    } else if (idx < 9) {
        return {row: 2, column: idx - 5};
    } else if (idx < 10) {
        return {row: 2, column: idx - 3};
    } else if (idx < 13) {
        return {row: 3, column: idx - 9};
    } else if (idx < 14) {
        return {row: 3, column: idx - 7};
    } else {
        return;
    }
};

const StyledDetail = styled.div`
    position: relative;
    height: 90%;
    aspect-ratio: 8 / 10;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow-x: visible;

    background-color: ${props => props.bgColor};
    border: 4px solid #EEEEEE;
    border-radius: 10%;
    box-shadow: 3px 3px 3px #AAAAAA;

    margin: 0;
    grid-row: ${props => handleGridPlacement(props.idx).row};
    grid-column: ${props => handleGridPlacement(props.idx).column};

    animation-name:  ${props => props.selected ? select : props.parent !== "story" ? flyIn : null};
    animation-duration: ${props => props.selected ? "200ms" : "300ms"};
    animation-fill-mode: forwards;
`;

const StyledConnectorContainer = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: ${props => props.idx === 0 ? "end" : "start"};

    overflow-x: visible;
`;

const StyledMidContainer = styled.div`
    position: relative;
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow-y: visible
`;

const StyledConnector = styled.div`
    background: ${props => props.borderColor};

    width: 250%;
    height: 1px;
    border: 4px solid ${props => props.borderColor};
    border-radius: 8px;
`;

const StyledTypeImg = styled.img`
width: 60%;
aspect-ratio: 1 / 1;
object-fit: contain;
`;

const Detail = (props) => {

    const borderColorSelector = {
        'who': "#FF7655",
        'where': "#1982C4",
        'when': "#8AC926",
        'why': "#6A4C93",
        'any': "#FFCA3A",
    };

    const bgColorSelector = {
        'who': "#FFDED6",
        'where': "#DBEEFA",
        'when': "#EEF8DD",
        'why': "#EAE4F1",
        'any': "#FFCA3A",
    }
    
    const connectorList = (num, idx) => {
        return new Array(num).fill(undefined).map((x, i) => {
            return <StyledConnector 
                key={i} 
                idx={idx}
                borderColor={borderColorSelector[props.type]}
                bgColor={bgColorSelector[props.type]}
            />;
        });
    }
    return (
        <StyledDetail
            selected={props.selected}
            parent={props.parent}
            onClick={() => props.handleClick(props.idx)}
            idx={props.idx}
            borderColor={borderColorSelector[props.type]}
            bgColor={bgColorSelector[props.type]}            
        >
            <StyledConnectorContainer idx={0}>
                {connectorList(props.connectors[0], 0)}
            </StyledConnectorContainer>
            <StyledMidContainer>
                {props.counter >= 0 &&
                    <Bomb 
                    counter={props.counter}
                    type={props.type}
                    borderColor={borderColorSelector[props.type]}
                    bgColor={bgColorSelector[props.type]}
                    />
                }
                <StyledTypeImg 
                    src={"https://raw.githubusercontent.com/alfredduvoire/soze/main/public/" + props.type + ".png"}
                    alt=""
                />
            </StyledMidContainer>
            <StyledConnectorContainer idx={1}>
                {connectorList(props.connectors[1], 1)}
            </StyledConnectorContainer>
        </StyledDetail>
    );
}

export default Detail;    