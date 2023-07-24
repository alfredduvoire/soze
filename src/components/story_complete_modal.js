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
  height: 100px;
  width: 400px;
  display: flex;
  text-wrap: wrap;
  flex-direction: column;

  padding: 10px;

  background: #FF3333;
  color: #FFFFFF;

  animation-name: ${props => (props.storyComplete) ? inOut : null};
  animation-duration: 300ms;

  text-align: center;

  position: absolute; 
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StoryCompleteModal = (props) => {
    
    return (
        <StyledStoryCompleteModal storyComplete={props.storyComplete}>
        STORY CHECKS OUT... 
        <br />
        BUT I'VE GOT ANOTHER QUESTION
        </StyledStoryCompleteModal>
    );
}


export default StoryCompleteModal;