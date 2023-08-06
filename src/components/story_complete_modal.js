import styled, {keyframes} from 'styled-components';

const inOut = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
    z-index: -1;
  }
  20% {
    opacity: 1;
    transform: scale(1);
    z-index: 100;
  }
  80% {
    opacity: 1;
    transform: scale(1);
    z-index: 100;
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
    z-index: -1;
  }
`;

const StyledStoryCompleteModal = styled.div`
	position: relative;
  width: 30%;
  bottom: 150px;
  left: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  aspect-ratio: 16 / 9;
  padding: 20px;

	background: #DDDDDD;
	border-radius: .4em;

  border: 3px solid #FFFFFF;
  // box-shadow: 3px 3px 0px #FFC000, inset 3px 3px 0px #FFC000;

  
  opacity: 0;
  z-index: -1;

  animation-name: ${props => props.showCompleteModal ? inOut : null};
  animation-duration: ${props => "" + props.duration + "ms"};

  text-align: center;
  color: #333333;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 24px solid transparent;
    border-left-color: #DDDDDD;
    border-right: 0;
    margin-top: -24px;
    margin-right: -24px;
  }
`;

const StoryCompleteModal = (props) => {

  const dialogueText = props.dialogueText.map((x) => {
    return (
      <b>{x}<br /></b>
    );

  });
    
    return (
        <StyledStoryCompleteModal showCompleteModal={props.showCompleteModal} duration={props.duration}>
        {dialogueText}
        </StyledStoryCompleteModal>
    );
}


export default StoryCompleteModal;