import styled from 'styled-components';
import PlayerMessage from './player_message';

const StyledMessageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;

    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    background-color: rgba(255, 255, 255, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const PlayerMessageContainer = (props) => {
    return (
        <StyledMessageContainer>
            <PlayerMessage 
                msg={props.msg}
            />
        </StyledMessageContainer>
    );
}


export default PlayerMessageContainer;