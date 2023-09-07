import styled from 'styled-components';

const StyledMessage = styled.div`
    width: 50%;
    height: 40%;
    padding: 10px;
    box-sizing: border-box;

    background-color: #6A4C93;
    color: #FFFFFF;

    border: 4px solid #FFFFFF;
    border-radius: 5%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const PlayerMessage = (props) => {
    return (
        <StyledMessage>
            {props.msg}
        </StyledMessage>
    );
}


export default PlayerMessage;