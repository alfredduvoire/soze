import styled from 'styled-components';

const StyledInvalidWarning = styled.div`
    width: 100%;

    display: flex;
    align-items: end;

    // margin: 1em 0em;
    padding-left: 300px;

    font-size: 1.5em;
    font-weight: bold;
    color: #BB3300;

    opacity: ${props => props.showWarning ? 1 : 0};
    // border: 2px solid blue;
`;

const InvalidWarning = (props) => {
    
    return (
        <StyledInvalidWarning showWarning={props.showWarning}>
            THIS STORY ISN'T ADDING UP...
        </StyledInvalidWarning>
    );
}


export default InvalidWarning;