import styled from 'styled-components'

const StyledStorySlot = styled.div`
    background-color: rgba(255, 255, 255, 0);
    height: 90%;
    aspect-ratio: 80 / 98;
    box-sizing: border-box;

    margin: 0px 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow-x: visible;

    border: 3px solid ${props => (props.slotColor !== null) ? props.slotColor : "#FFCA3A"};
    border-radius: 4px;
`;

const StorySlot = (props) => {

    const colorSelector = {
        'who': "#FF7655",
        'where': "#1982C4",
        'when': "#8AC926",
        'why': "#6A4C93",
        'any': "#FFCA3A",
    };


    return (
        <StyledStorySlot slotColor={colorSelector[props.slotColor]}>
        {props.detail}
        </StyledStorySlot>
    );
}


export default StorySlot;  