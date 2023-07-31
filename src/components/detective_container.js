import styled from 'styled-components';

const StyledDetectiveContainer = styled.div`
    width: 100%;
    height: 5em;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 1em 0em;

    font-size: 1.5em;
    font-weight: bold;

    border: 2px solid blue;
`;

const DetectiveContainer = (props) => {
    
    return (
        <StyledDetectiveContainer>
            Detective Image
            Detective Dialog
        </StyledDetectiveContainer>
    );
}


export default DetectiveContainer;