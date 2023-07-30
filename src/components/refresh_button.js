import styled from 'styled-components';

const StyledRefreshButton = styled.button`
    aspect-ratio: 1;
    
    font-weight: bold;
    font-size: 1.5em;

    padding: 10px;

    border: 2px solid green;
    border-radius: 5px;
`;

const RefreshButton = (props) => {
    
    return (
        <StyledRefreshButton
            onClick={props.handleRefreshClick}
        >
            {props.numRefreshes}
        </StyledRefreshButton>

    );
}


export default RefreshButton;