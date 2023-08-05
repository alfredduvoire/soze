import styled from 'styled-components';

const StyledRefreshButton = styled.div`
    width: 65%;
    aspect-ratio: 1;
    background-image: url("https://raw.githubusercontent.com/dcstrandberg/soze/main/public/refresh-image.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;
    font-size: 1.2em;
    color: #333333;
    text-align: center;

    // padding: 10px;

    // border: 2px solid green;
    // border-radius: 5px;
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