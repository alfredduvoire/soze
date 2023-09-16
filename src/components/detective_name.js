import styled from 'styled-components';

const StyledDetectiveName = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.5vw;
    font-weight: bold;
`;

const DetectiveName = (props) => {
    
    return (
        <StyledDetectiveName>
            Interrogation #{props.level}: Detective {props.detectiveName}
        </StyledDetectiveName>
    );
}


export default DetectiveName;