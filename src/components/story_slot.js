import styled, {keyframes} from 'styled-components'

const pulse = keyframes`
	0% {
        opacity: 0;
	}
    80% {
        opacity: 0;
    }
    90% {
        opacity: .75;
    }
	100% {
        opacity: 0;
    }
`;

const StyledStorySlot = styled.div`
    position: relative;
    background: rgb(255,255,255);
    background: ${props => props.gradient !== null ? props.gradient : null};
    height: 90%;
    aspect-ratio: 80 / 98;
    box-sizing: border-box;

    margin: 0px 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow-x: visible;
    z-index: 1;

    border: 3px solid ${props => (props.slotColor !== null) ? props.slotColor : "#FFCA3A"};
    border-radius: 10%;

    &:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: ${props => props.gradient !== null ? "100%" : "0%"};
        height: ${props => props.gradient !== null ? "100%" : "0%"};
        opacity: 0%;
        background-color: #FFFFFF;
        animation-name: ${props => props.gradient !== null ? pulse : null};
        animation-duration: 15s;
        animation-iteration-count: infinite;     
    }

`;

const StyledRefreshIndicator = styled.div`
    width: 50%;
    // height: 100%;
    aspect-ratio: 1 / 1;

    background-image: url("https://raw.githubusercontent.com/alfredduvoire/soze/refresh_slots/public/refresh-nobg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1em;
    font-weight: bold;
    text-justify: center;    
    padding-bottom: 6%;

`; 

const StorySlot = (props) => {

    const colorSelector = {
        'who': "#FF7655",
        'where': "#1982C4",
        'when': "#8AC926",
        'why': "#6A4C93",
        'any': "#FFCA3A",
    };

    const gradientSelector = {
        'who': props.detail !== undefined ? null : "radial-gradient(circle, rgba(255,118,85,0.3) 0%, rgba(255,255,255,1) 100%)",
        'where': props.detail !== undefined ? null : "radial-gradient(circle, rgba(25,130,196,0.3) 0%, rgba(255,255,255,1) 100%)",
        'when': props.detail !== undefined ? null : "radial-gradient(circle, rgba(138,201,38,0.3) 0%, rgba(255,255,255,1) 100%)",
        'why': props.detail !== undefined ? null : "radial-gradient(circle, rgba(106,76,147,0.3) 0%, rgba(255,255,255,1) 100%)",
        'any': null,
    };


    return (
        <StyledStorySlot slotColor={colorSelector[props.slotColor]} gradient={gradientSelector[props.slotColor]}>
        {(props.detail === undefined) && (props.slotColor !== "any") && 
        <StyledRefreshIndicator
            slotColor={colorSelector[props.slotColor]} gradient={gradientSelector[props.slotColor]}
        >
            +
        </StyledRefreshIndicator>
        }
        {props.detail !== undefined && props.detail}
        </StyledStorySlot>
    );
}


export default StorySlot;  